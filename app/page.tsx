import SIPCalculator from '../components/SIPCalculator'

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">SIP Calculator</h1>
        <SIPCalculator />
      </div>
    </main>
  )
}

