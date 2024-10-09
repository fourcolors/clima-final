'use client'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { getAddress } from 'viem'
import abi from '../../../betABI'
import { SITE_NAME } from '@/utils/site'

export default function CheckResults() {
  const { data, writeContract, error } = useWriteContract()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleClaimWinnings = () => {
    const checksummedAddress = getAddress('0x7f3a5c4E4A33DBbb569B72094da4C40e64129523')

    writeContract({
      address: checksummedAddress,
      abi: abi,
      functionName: 'claimWinnings',
      args: [3],
      chainId: 31,
    })
  }

  return (
    <div>
      <h2 className='text-2xl mb-2'>{SITE_NAME}</h2>

      <div className='flex flex-col items-center'>
        <h3 className='text-xl mb-4'>Check Results</h3>
        <button onClick={handleClaimWinnings} disabled={isLoading} className='px-4 py-2 bg-black text-white rounded'>
          {isLoading ? 'Claiming...' : 'Claim Winnings'}
        </button>
        {isSuccess && <p className='mt-2 text-green-500'>Winnings claimed successfully!</p>}
        {error && <p className='mt-2 text-red-500'>Error: {error.message}</p>}
      </div>
    </div>
  )
}
