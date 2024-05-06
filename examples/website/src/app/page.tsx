'use client'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { useState } from 'react'
import { TrillyClient, createTrillyClient } from '@trilly/client-js/src'
import { useContainer } from '@trilly/client-js/src/react'

export default function Home() {
  const [trilly] = useState(
    createTrillyClient({
      accountId: process.env.NEXT_PUBLIC_TRILLY_ACCOUNT_ID!,
      context: {},
      apiUrl: 'http://localhost:3000',
    }),
  )

  const container = useContainer(trilly, 'homepage', 'website')

  if (!container?.data) {
    return <></>
  }

  const { data } = container

  return (
    <>
      <Header />
      <main>
        <Hero data={data.hero} />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
