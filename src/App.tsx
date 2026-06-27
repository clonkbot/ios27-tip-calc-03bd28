import { useState, useEffect } from 'react'
import './styles.css'

function App() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercent, setTipPercent] = useState(18)
  const [splitCount, setSplitCount] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  const bill = parseFloat(billAmount) || 0
  const tipAmount = bill * (tipPercent / 100)
  const totalAmount = bill + tipAmount
  const perPerson = splitCount > 0 ? totalAmount / splitCount : totalAmount

  const tipPresets = [15, 18, 20, 25]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tl from-blue-600/8 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-bl from-teal-400/6 to-transparent blur-2xl" />
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Dynamic Island style */}
        <header className={`pt-6 pb-4 px-4 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-center">
              <div className="glass-pill px-6 py-2.5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
                <span className="text-sm font-medium tracking-wide text-white/90">iOS 27 Swift SDK</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-4 pt-2">
          <div className="mx-auto max-w-md space-y-4">

            {/* Bill Input Card */}
            <div className={`glass-card p-6 transition-all duration-700 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-3 font-medium">Bill Amount</label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl md:text-5xl font-light text-white/30">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={billAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '')
                    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                      setBillAmount(value)
                    }
                  }}
                  placeholder="0.00"
                  className="w-full bg-transparent text-4xl md:text-5xl font-light pl-8 md:pl-10 py-2 outline-none placeholder:text-white/20 focus:placeholder:text-white/10 transition-colors"
                />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 input-focus-line transition-opacity" />
              </div>
            </div>

            {/* Tip Selection Card */}
            <div className={`glass-card p-6 transition-all duration-700 delay-200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs uppercase tracking-widest text-white/40 font-medium">Tip</label>
                <span className="text-2xl font-light text-cyan-400">{tipPercent}%</span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {tipPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setTipPercent(preset)}
                    className={`tip-button py-3 px-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      tipPercent === preset
                        ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20 border border-cyan-500/30'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/5'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>

              {/* Custom Slider */}
              <div className="relative mt-6 px-1">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(parseInt(e.target.value))}
                  className="slider-ios w-full"
                />
                <div className="flex justify-between text-xs text-white/30 mt-2 px-0.5">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            {/* Split Card */}
            <div className={`glass-card p-6 transition-all duration-700 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-medium mb-1">Split</label>
                  <span className="text-white/60 text-sm">{splitCount} {splitCount === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                    className="split-button w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-light text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                    disabled={splitCount <= 1}
                  >
                    <span className="mt-[-2px]">-</span>
                  </button>
                  <span className="text-3xl font-light w-12 text-center tabular-nums">{splitCount}</span>
                  <button
                    onClick={() => setSplitCount(splitCount + 1)}
                    className="split-button w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-light text-white/60 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                  >
                    <span className="mt-[-2px]">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Card - Hero Display */}
            <div className={`glass-card-accent p-6 transition-all duration-700 delay-400 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/50 text-sm">Tip Amount</span>
                  <span className="text-xl font-light">{formatCurrency(tipAmount)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/50 text-sm">Total</span>
                  <span className="text-xl font-light">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/70 font-medium">Per Person</span>
                  <div className="text-right">
                    <span className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400">
                      {formatCurrency(perPerson)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className={`py-6 px-4 transition-all duration-700 delay-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-center text-xs text-white/25 tracking-wide">
            Requested by <span className="text-white/35">@web-user</span> · Built by <span className="text-white/35">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
