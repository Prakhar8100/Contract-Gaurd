import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContracts } from '../../hooks/useContracts'
import ContractListPage from './ContractListPage'

export function ContractUI() {
  return <ContractListPage />
}

export default ContractUI
