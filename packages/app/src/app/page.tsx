'use client'
import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { getAddress, parseEther } from 'viem'
import abi from '../../betABI'
import { SITE_NAME } from '@/utils/site'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [amount, setAmount] = useState('0.004')
  const router = useRouter()

  const { data, writeContract, error } = useWriteContract()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  })

  useEffect(() => {
    if (isSuccess) {
      router.push('/results')
    }
  }, [isSuccess, router])

  const handlePlaceBet = (isUnderCat4: boolean) => {
    const checksummedAddress = getAddress('0x7f3a5c4E4A33DBbb569B72094da4C40e64129523')

    writeContract({
      address: checksummedAddress,
      abi: abi,
      functionName: 'placeBet',
      args: [isUnderCat4],
      value: parseEther(amount),
      chainId: 31,
    })
  }

  return (
    <div>
      <h1 className='text-center text-3xl font-bold mb-4'>Welcome to Clima Bets</h1>
      <h2 className='text-center text-xl mb-6'>Make a bet for a good cause!</h2>
      <div className='flex flex-col items-center'>
        <Image
          src='https://cdn.discordapp.com/attachments/1292925769424830576/1293426365692903445/52461C2C-BB22-4AA7-AC88-D026CD81BE61.webp?ex=670754ac&is=6706032c&hm=461b6c44beabbee4aa31678fc86b063b2bcdd660e5ca72492f8c8719e9f31d62&'
          alt='Hurricane Image'
          width={300}
          height={300}
        />
        <div className='mt-4'>
          <button
            onClick={() => handlePlaceBet(true)}
            disabled={isLoading}
            className='mr-4 px-4 py-2 bg-black text-white rounded'>
            {isLoading ? 'Placing Bet...' : 'Bet under Cat 4'}
          </button>
          <button
            onClick={() => handlePlaceBet(false)}
            disabled={isLoading}
            className='px-4 py-2 bg-black text-white rounded'>
            {isLoading ? 'Placing Bet...' : 'Bet over Cat 5'}
          </button>
        </div>
        {error && <p className='mt-2 text-red-500'>Error: {error.message}</p>}
      </div>
    </div>
  )
}
