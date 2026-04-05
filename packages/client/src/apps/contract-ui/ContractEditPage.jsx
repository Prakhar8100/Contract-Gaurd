import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContracts } from '../../hooks/useContracts'
import { ContractForm } from './components/ContractForm'

export default function ContractEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { contracts, loading, updateContract, fetchContracts } = useContracts()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    fetchContracts()
  }, [])

  useEffect(() => {
    if (contracts.length > 0) {
      const found = contracts.find(c => c._id === id)
      setContract(found)
    }
  }, [contracts, id])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (!contract) return <div className="text-center py-8 text-red-600">Contract not found</div>

  const handleSubmit = async (data) => {
    await updateContract(id, data)
    navigate('/contracts')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Edit Contract</h1>
          <p className="text-gray-500 mt-1">{contract.contractNumber}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <ContractForm
            initialData={contract}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/contracts')}
          />
        </div>
      </div>
    </div>
  )
}
