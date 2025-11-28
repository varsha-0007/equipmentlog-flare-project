"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useEquipmentContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const { data, actions, state } = useEquipmentContract()

  const handleAddEquipment = async () => {
    if (!name || !description) return
    await actions.addEquipment(name, description)
    setName("")
    setDescription("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <h2 className="text-xl text-foreground">Please connect your wallet</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Equipment Log</h1>

        <div className="bg-card border border-border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Add Equipment</h2>

          <input
            type="text"
            placeholder="Equipment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg"
          />

          <button
            onClick={handleAddEquipment}
            disabled={state.isLoading}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {state.isLoading ? "Submitting..." : "Add Equipment"}
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Logs ({data.totalLogs})</h2>

          <div className="space-y-3">
            {data.logs.map((log, i) => (
              <div key={i} className="border border-border rounded-lg p-3 bg-background">
                <p className="font-semibold">{log.name}</p>
                <p className="text-sm text-muted-foreground">{log.description}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {state.hash && (
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground">Transaction Hash:</p>
            <p className="text-sm break-all">{state.hash}</p>
          </div>
        )}

        {state.error && (
          <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
            Error: {state.error.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
