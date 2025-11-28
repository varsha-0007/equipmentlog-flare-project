# Equipment Log – Flare Network (Coston2)

## **Contract Address**
`0xC6FcA24C1C43b024D3bb69D995916ef9594d8Df0`  
Explorer: https://coston2-explorer.flare.network/address/0xC6FcA24C1C43b024D3bb69D995916ef9594d8Df0

---

## **Description**
Equipment Log is a decentralized application deployed on the Flare Coston2 test network.  
It provides a transparent and immutable way to store equipment records on-chain using a smart contract.

Each log contains:
- Equipment name  
- Description  
- Timestamp of entry  

The application offers a clean and intuitive UI, wallet-gated functionality, and real-time contract interaction using Wagmi and Viem.

---

## **Features**
### ✅ **Add Equipment**
Users can submit a new equipment entry containing:
- Name  
- Description  

Each submission is permanently stored on-chain.

### ✅ **View Logs**
Fetches and displays:
- Total number of equipment logs  
- Detailed list of every entry (name, description, timestamp)

### ✅ **Wallet Gating**
The UI automatically prevents interaction until a wallet is connected.

### ✅ **Transaction Status Handling**
- Pending state  
- Confirming state  
- Final confirmation  
- Error handling  
- Transaction hash display  

### ✅ **Fully On-Chain Data**
All equipment entries are retrieved directly from the smart contract.

---

## **How It Solves the Problem**
Traditional equipment tracking systems rely on:
- Centralized databases  
- Manual logs  
- Risk of data tampering  
- Limited transparency  

This project solves these issues by using blockchain as the backend storage layer.

### **Benefits**
- **Immutability:** Logs cannot be changed or deleted once submitted  
- **Transparency:** Anyone can view all historical entries  
- **Decentralization:** No backend servers required  
- **Security:** Data integrity guaranteed by the Flare network  
- **Accessibility:** Interact via any EVM wallet (Metamask, Bifrost, etc.)

### **Use Cases**
- Asset management  
- Warehouse inventory  
- Equipment maintenance tracking  
- Audit trails for physical assets  

---

This project demonstrates how smart contracts can replace traditional asset logging systems with transparent, verifiable, and decentralized infrastructure.


