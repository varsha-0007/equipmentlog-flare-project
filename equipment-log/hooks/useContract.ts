"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface EquipmentLogEntry {
  name: string
  description: string
  timestamp: number
}

export const useEquipmentContract = () => {
  const { address } = useAccount()

  const [isLoading, setIsLoading] = useState(false)
  const [logs, setLogs] = useState<EquipmentLogEntry[]>([])

  const { data: totalLogs, refetch: refetchTotalLogs } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTotalLogs",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const fetchLogs = async () => {
    if (!totalLogs) return
    const count = Number(totalLogs)

    const entries: EquipmentLogEntry[] = []

    for (let i = 0; i < count; i++) {
      const entry = await useReadContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "getLog",
        args: [BigInt(i)],
      }).refetch()

      if (entry.data) {
        const [name, description, timestamp] = entry.data as any
        entries.push({
          name,
          description,
          timestamp: Number(timestamp),
        })
      }
    }

    setLogs(entries)
  }

  useEffect(() => {
    fetchLogs()
  }, [totalLogs])

  useEffect(() => {
    if (isConfirmed) {
      refetchTotalLogs()
      fetchLogs()
    }
  }, [isConfirmed])

  const addEquipment = async (name: string, description: string) => {
    if (!name || !description) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addEquipment",
        args: [name, description],
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data: {
      totalLogs: totalLogs ? Number(totalLogs) : 0,
      logs,
    },
    actions: {
      addEquipment,
    },
    state: {
      isLoading: isLoading || isPending || isConfirming,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    },
  }
}
