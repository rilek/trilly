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
import { createTrillyClient, getField } from '@trillyapp/vanilla'
import { useContainer, TrillyDevTools } from '@trillyapp/react'

import '@trillyapp/react/dist/style.css'

export default function Home() {
  const [trilly] = useState(
    createTrillyClient({
      apiKey: process.env.NEXT_PUBLIC_TRILLY_API_KEY!,
      context: {},
      apiUrl: 'https://trilly.onrender.com',
    }),
  )

  const container = useContainer(trilly, 'website', 'examples')
  const hero = getField(container as any, 'hero')!

  return (
    <>
      <Header />
      <main>
        {hero && <Hero data={hero} />}
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
      <TrillyDevTools client={trilly} />
    </>
  )
}
