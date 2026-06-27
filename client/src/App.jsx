import React, { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  ChevronDown,
  Coins,
  LineChart,
  Lock,
  LogIn,
  Menu,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Wallet,
  X
} from "lucide-react";

const stocks = [
  {
    type: "stock",
    name: "Apple Inc.",
    label: "Apple",
    symbol: "AAPL",
    exchange: "NASDAQ",
    price: 214.35,
    change: 2.4,
    sentiment: "Bullish",
    marketCap: "$3.28T",
    volume: "64.2M",
    spark: [42, 44, 43, 47, 49, 48, 52, 55, 57, 60],
    candles: [42, 46, 45, 50, 49, 54, 52, 58, 56, 61, 63, 66],
    summary:
      "Apple is seeing stronger buying interest as technology shares attract renewed attention. The move is supported by steady volume and a clean short-term trend."
  },
  {
    type: "stock",
    name: "Nvidia Corporation",
    label: "Nvidia",
    symbol: "NVDA",
    exchange: "NASDAQ",
    price: 189.26,
    change: 3.1,
    sentiment: "Strong",
    marketCap: "$4.61T",
    volume: "212.8M",
    spark: [36, 37, 42, 44, 43, 48, 51, 50, 56, 62],
    candles: [37, 40, 44, 43, 47, 51, 54, 53, 58, 62, 65, 69],
    summary:
      "Nvidia continues to show momentum as semiconductor demand remains a central market theme. Recent price action suggests buyers are still active at higher levels."
  },
  {
    type: "stock",
    name: "Tesla, Inc.",
    label: "Tesla",
    symbol: "TSLA",
    exchange: "NASDAQ",
    price: 326.12,
    change: -1.2,
    sentiment: "Mixed",
    marketCap: "$1.04T",
    volume: "87.1M",
    spark: [61, 58, 55, 57, 53, 52, 50, 49, 51, 48],
    candles: [60, 58, 57, 55, 53, 56, 52, 50, 51, 49, 47, 48],
    summary:
      "Tesla is moving unevenly, with price swings reflecting uncertainty around growth expectations. Volume is elevated, which can make short-term moves feel sharper."
  },
  {
    type: "stock",
    name: "Microsoft Corporation",
    label: "Microsoft",
    symbol: "MSFT",
    exchange: "NASDAQ",
    price: 497.88,
    change: 1.6,
    sentiment: "Bullish",
    marketCap: "$3.70T",
    volume: "32.5M",
    spark: [45, 47, 46, 49, 51, 53, 52, 55, 57, 58],
    candles: [44, 46, 49, 48, 51, 53, 55, 54, 56, 59, 60, 62],
    summary:
      "Microsoft remains steady, with buyers favoring large software names. The trend is constructive while volatility stays contained."
  },
  {
    type: "stock",
    name: "Amazon.com, Inc.",
    label: "Amazon",
    symbol: "AMZN",
    exchange: "NASDAQ",
    price: 227.44,
    change: 0.8,
    sentiment: "Neutral",
    marketCap: "$2.41T",
    volume: "41.9M",
    spark: [51, 50, 52, 53, 52, 54, 55, 56, 55, 57],
    candles: [50, 51, 53, 52, 54, 55, 56, 55, 57, 58, 57, 59],
    summary:
      "Amazon is edging higher with moderate participation. The move is positive, though not as forceful as the strongest technology leaders."
  }
];

const crypto = [
  {
    type: "crypto",
    name: "Bitcoin",
    label: "Bitcoin",
    symbol: "BTC",
    exchange: "Crypto",
    price: 108420,
    change: -2.1,
    sentiment: "Volatile",
    marketCap: "$2.15T",
    volume: "$46.7B",
    spark: [66, 64, 61, 63, 58, 60, 56, 57, 54, 52],
    candles: [67, 65, 63, 60, 62, 58, 57, 55, 56, 53, 52, 54],
    summary:
      "Bitcoin is moving through a choppy session as traders react to broader risk sentiment. Price remains sensitive to volume spikes and macro news."
  },
  {
    type: "crypto",
    name: "Ethereum",
    label: "Ethereum",
    symbol: "ETH",
    exchange: "Crypto",
    price: 3852,
    change: 1.4,
    sentiment: "Improving",
    marketCap: "$463B",
    volume: "$22.4B",
    spark: [44, 42, 45, 47, 46, 49, 51, 50, 53, 56],
    candles: [43, 44, 46, 45, 48, 49, 51, 50, 52, 55, 57, 58],
    summary:
      "Ethereum is recovering from recent weakness. Momentum is improving, but crypto markets can reverse quickly when liquidity changes."
  },
  {
    type: "crypto",
    name: "Solana",
    label: "Solana",
    symbol: "SOL",
    exchange: "Crypto",
    price: 172.62,
    change: 4.6,
    sentiment: "Bullish",
    marketCap: "$82B",
    volume: "$5.8B",
    spark: [34, 37, 39, 41, 45, 46, 49, 53, 56, 61],
    candles: [35, 37, 38, 42, 44, 47, 48, 52, 55, 59, 62, 64],
    summary:
      "Solana is showing stronger relative momentum. A fast move like this can attract attention, but it also raises short-term volatility."
  },
  {
    type: "crypto",
    name: "Dogecoin",
    label: "Dogecoin",
    symbol: "DOGE",
    exchange: "Crypto",
    price: 0.19,
    change: -0.9,
    sentiment: "Mixed",
    marketCap: "$28B",
    volume: "$1.7B",
    spark: [52, 54, 51, 50, 53, 49, 48, 50, 47, 46],
    candles: [52, 53, 51, 49, 50, 48, 47, 49, 46, 45, 47, 46],
    summary:
      "Dogecoin is trading without a clear direction. Meme-linked crypto assets often react sharply to social attention and liquidity shifts."
  }
];

const allAssets = [...stocks, ...crypto];

const learnTerms = [
  {
    term: "RSI",
    title: "Relative Strength Index",
    body:
      "Think of RSI as a measure of market excitement. High values suggest strong recent buying activity, while low values suggest stronger recent selling pressure."
  },
  {
    term: "MACD",
    title: "Moving Average Convergence Divergence",
    body:
      "MACD compares two price trends to show whether momentum is strengthening or fading. Beginners can read it as a momentum health check."
  },
  {
    term: "ETF",
    title: "Exchange-Traded Fund",
    body:
      "An ETF is a basket of assets that trades like a stock. It can help people understand broad market themes without tracking every individual company."
  },
  {
    term: "Bull Market",
    title: "Bull Market",
    body:
      "A bull market is a period when prices are generally rising and investor confidence is improving."
  },
  {
    term: "Bear Market",
    title: "Bear Market",
    body:
      "A bear market is a period when prices are generally falling and investors are more cautious."
  },
  {
    term: "Candlestick",
    title: "Candlestick Chart",
    body:
      "A candlestick shows where price opened, closed, and moved during a period. It helps you see the tug-of-war between buyers and sellers."
  },
  {
    term: "Volume",
    title: "Trading Volume",
    body:
      "Volume shows how much trading happened. A price move with high volume usually carries more attention than a move with low volume."
  }
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "stocks", label: "Stocks", icon: LineChart },
  { id: "crypto", label: "Crypto", icon: Coins },
  { id: "watchlist", label: "Watchlist", icon: Star },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User }
];

function formatCurrency(value, type) {
  if (type === "crypto" && value < 1) return `$${value.toFixed(2)}`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : 2
  }).format(value);
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedAsset, setSelectedAsset] = useState(stocks[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  const openAsset = (asset) => {
    setSelectedAsset(asset);
    setPage(asset.type === "crypto" ? "crypto-detail" : "stock-detail");
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-ink-950 text-gray-50">
      <Sidebar
        page={page}
        setPage={setPage}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-ink-800 bg-ink-950/92 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              className="rounded-md border border-ink-800 p-2 text-gray-300 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-sm text-gray-400">Educational market workspace</p>
              <h1 className="text-xl font-semibold text-white md:text-2xl">
                {pageTitle(page, selectedAsset)}
              </h1>
            </div>
            <div className="hidden items-center gap-2 rounded-md border border-ink-800 bg-ink-900 px-3 py-2 text-sm text-gray-300 sm:flex">
              <ShieldCheck size={16} className="text-accent" />
              No investment advice
            </div>
          </div>
        </header>
        <div className="px-4 py-6 md:px-8">
          {page === "dashboard" && <Dashboard onOpenAsset={openAsset} />}
          {page === "stocks" && (
            <AssetDirectory title="Stocks" assets={stocks} onOpenAsset={openAsset} />
          )}
          {page === "crypto" && (
            <AssetDirectory title="Crypto" assets={crypto} onOpenAsset={openAsset} />
          )}
          {page === "watchlist" && <Watchlist onOpenAsset={openAsset} />}
          {page === "learn" && <LearnPage />}
          {page === "profile" && <ProfilePage />}
          {page === "stock-detail" && <AssetDetail asset={selectedAsset} />}
          {page === "crypto-detail" && <AssetDetail asset={selectedAsset} />}
        </div>
      </main>
    </div>
  );
}

function pageTitle(page, asset) {
  const titles = {
    dashboard: "What is happening in the market?",
    stocks: "Stock market overview",
    crypto: "Cryptocurrency market overview",
    watchlist: "What assets am I tracking?",
    learn: "What does this financial term mean?",
    profile: "What have I saved?"
  };
  if (page === "stock-detail") return `What does ${asset.symbol} mean today?`;
  if (page === "crypto-detail") return `What does ${asset.symbol} movement mean?`;
  return titles[page] || "InvestSimple";
}

function LoginPage({ onLogin }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-ink-800 bg-ink-900 p-8 shadow-panel">
        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-accent text-white">
            <TrendingUp size={25} />
          </div>
          <h1 className="text-3xl font-bold text-white">InvestSimple</h1>
          <p className="mt-2 text-gray-400">Understand Markets. Invest Smarter.</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-300">Username</span>
            <input
              className="w-full rounded-md border border-ink-800 bg-ink-950 px-4 py-3 text-white placeholder:text-gray-600"
              placeholder="sathvika"
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-300">Password</span>
            <div className="flex items-center rounded-md border border-ink-800 bg-ink-950 px-4">
              <Lock size={18} className="text-gray-500" />
              <input
                className="w-full border-0 bg-transparent px-3 py-3 text-white outline-none placeholder:text-gray-600"
                placeholder="Enter password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </label>
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 font-semibold text-white transition hover:bg-blue-500">
            <LogIn size={18} />
            Login
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-ink-800 px-4 py-3 font-semibold text-gray-200 transition hover:border-accent hover:text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, open, setOpen }) {
  const content = (
    <aside className="flex h-full flex-col border-r border-ink-800 bg-ink-900 px-5 py-6">
      <div className="mb-8 flex items-center justify-between">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => {
            setPage("dashboard");
            setOpen(false);
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent">
            <TrendingUp size={21} />
          </span>
          <span>
            <span className="block text-lg font-bold text-white">InvestSimple</span>
            <span className="text-xs text-gray-500">Market education</span>
          </span>
        </button>
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation">
          <X size={20} />
        </button>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = page === item.id || page.includes(item.id.slice(0, -1));
          return (
            <button
              key={item.id}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${active
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:bg-ink-800 hover:text-white"
                }`}
              onClick={() => {
                setPage(item.id);
                setOpen(false);
              }}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-lg border border-ink-800 bg-ink-950 p-4">
        <p className="text-sm font-semibold text-white">InvestSimple Analysis</p>
        <p className="mt-2 text-xs leading-5 text-gray-400">
          Educational insights only. No buy, sell, or personalized investment advice.
        </p>
      </div>
    </aside>
  );

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">{content}</div>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-72" onClick={(event) => event.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </>
  );
}

function Dashboard({ onOpenAsset }) {
  return (
    <div className="space-y-6">
      <SearchBox onOpenAsset={onOpenAsset} />
      <section>
        <SectionHeader title="Market Overview" caption="Major stocks beginners often track" />
        <AssetGrid assets={stocks} onOpenAsset={onOpenAsset} />
      </section>
      <section>
        <SectionHeader title="Trending Crypto" caption="Digital assets with active market interest" />
        <AssetGrid assets={crypto} onOpenAsset={onOpenAsset} />
      </section>
      <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          Market Pulse
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">InvestSimple Analysis</h2>
        <p className="mt-4 max-w-4xl text-base leading-7 text-gray-300">
          Technology stocks are showing strong momentum today, while cryptocurrency markets remain
          volatile. Increased trading volume suggests heightened investor activity. For beginners,
          this means the market has opportunity and uncertainty at the same time, so understanding
          trend, volume, and risk is more important than reacting to headlines.
        </p>
      </section>
    </div>
  );
}

function SearchBox({ onOpenAsset }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    if (!query.trim()) return allAssets.slice(0, 5);
    const term = query.toLowerCase();
    return allAssets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(term) ||
        asset.label.toLowerCase().includes(term) ||
        asset.symbol.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="rounded-lg border border-ink-800 bg-ink-900 p-4 shadow-panel">
      <div className="flex items-center gap-3 rounded-md border border-ink-800 bg-ink-950 px-4">
        <Search size={22} className="text-gray-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-h-14 w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500 md:text-lg"
          placeholder="Search Stocks or Crypto Assets..."
        />
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
        {matches.map((asset) => (
          <button
            key={asset.symbol}
            className="flex items-center justify-between rounded-md border border-ink-800 px-3 py-3 text-left transition hover:border-accent hover:bg-ink-800"
            onClick={() => onOpenAsset(asset)}
          >
            <span>
              <span className="block text-sm font-semibold text-white">{asset.label}</span>
              <span className="text-xs text-gray-500">{asset.symbol}</span>
            </span>
            <Change value={asset.change} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title, caption }) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-400">{caption}</p>
      </div>
    </div>
  );
}

function AssetGrid({ assets, onOpenAsset }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {assets.map((asset) => (
        <AssetCard key={asset.symbol} asset={asset} onClick={() => onOpenAsset(asset)} />
      ))}
    </div>
  );
}

function AssetCard({ asset, onClick }) {
  return (
    <button
      className="rounded-lg border border-ink-800 bg-ink-900 p-4 text-left shadow-panel transition hover:-translate-y-0.5 hover:border-accent"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{asset.label}</p>
          <p className="text-sm text-gray-500">{asset.symbol}</p>
        </div>
        <SentimentBadge label={asset.sentiment} positive={asset.change >= 0} />
      </div>
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold text-white">{formatCurrency(asset.price, asset.type)}</p>
          <Change value={asset.change} />
        </div>
        <Sparkline points={asset.spark} positive={asset.change >= 0} />
      </div>
    </button>
  );
}

function Change({ value }) {
  const positive = value >= 0;
  return (
    <span className={`text-sm font-semibold ${positive ? "text-gain" : "text-loss"}`}>
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

function SentimentBadge({ label, positive }) {
  return (
    <span
      className={`rounded px-2 py-1 text-xs font-semibold ${positive ? "bg-green-500/10 text-gain" : "bg-red-500/10 text-loss"
        }`}
    >
      {label}
    </span>
  );
}

function Sparkline({ points, positive }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const d = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 110;
      const y = 48 - ((point - min) / Math.max(max - min, 1)) * 38;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width="112" height="52" viewBox="0 0 112 52" aria-hidden="true">
      <path d={d} fill="none" stroke={positive ? "#22C55E" : "#EF4444"} strokeWidth="2.4" />
    </svg>
  );
}

function AssetDirectory({ title, assets, onOpenAsset }) {
  return (
    <div className="space-y-6">
      <SectionHeader title={title} caption="Open an asset to understand price, volume, and risk" />
      <AssetGrid assets={assets} onOpenAsset={onOpenAsset} />
    </div>
  );
}

function AssetDetail({ asset }) {
  const [timeframe, setTimeframe] = useState("1M");
  const [quantity, setQuantity] = useState("12");
  const [averagePrice, setAveragePrice] = useState(
    asset.type === "crypto" ? String(Math.round(asset.price * 0.92)) : String(Math.round(asset.price * 0.88))
  );
  const qty = Number(quantity) || 0;
  const avg = Number(averagePrice) || 0;
  const currentValue = qty * asset.price;
  const cost = qty * avg;
  const profitLoss = currentValue - cost;
  const returnPct = cost ? (profitLoss / cost) * 100 : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-accent">
              {asset.exchange}: {asset.symbol}
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white">{asset.name}</h2>
            <p className="mt-3 max-w-2xl text-gray-400">{asset.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Current Price" value={formatCurrency(asset.price, asset.type)} />
            <Metric label="Daily Change" value={<Change value={asset.change} />} />
            <Metric label="Market Cap" value={asset.marketCap} />
            <Metric label="Volume" value={asset.volume} />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-ink-800 bg-ink-900 p-4 shadow-panel">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Price Chart</h2>
            <p className="text-sm text-gray-400">Candlestick view for market structure</p>
          </div>
          <div className="grid grid-cols-5 rounded-md border border-ink-800 bg-ink-950 p-1">
            {["1D", "1W", "1M", "3M", "1Y"].map((option) => (
              <button
                key={option}
                className={`rounded px-3 py-2 text-sm font-semibold transition ${timeframe === option ? "bg-accent text-white" : "text-gray-400 hover:text-white"
                  }`}
                onClick={() => setTimeframe(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <CandlestickChart asset={asset} timeframe={timeframe} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AnalysisCard asset={asset} />
        <PositionCard
          asset={asset}
          quantity={quantity}
          setQuantity={setQuantity}
          averagePrice={averagePrice}
          setAveragePrice={setAveragePrice}
          currentValue={currentValue}
          profitLoss={profitLoss}
          returnPct={returnPct}
        />
      </section>

      <TechnicalBreakdown />
      {asset.type === "crypto" && <CryptoBasics asset={asset} />}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-ink-800 bg-ink-950 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-gray-500">{label}</p>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function CandlestickChart({ asset, timeframe }) {
  const values = asset.candles.map((value, index) => {
    const open = value + (index % 2 === 0 ? -2 : 2);
    const close = value + (asset.change >= 0 ? 2 : -2) + (index % 3);
    const high = Math.max(open, close) + 5 + (index % 2);
    const low = Math.min(open, close) - 5 - (index % 3);
    return { open, close, high, low };
  });
  const min = Math.min(...values.map((item) => item.low));
  const max = Math.max(...values.map((item) => item.high));
  const y = (value) => 260 - ((value - min) / (max - min)) * 220;

  return (
    <div className="relative h-[360px] overflow-hidden rounded-md border border-ink-800 bg-ink-950">
      <div className="absolute left-4 top-4 rounded border border-ink-800 bg-ink-900 px-3 py-2 text-sm text-gray-300">
        {asset.symbol} / USD · {timeframe}
      </div>
      <svg className="h-full w-full" viewBox="0 0 900 320" preserveAspectRatio="none">
        {[40, 95, 150, 205, 260].map((line) => (
          <line key={line} x1="0" x2="900" y1={line} y2={line} stroke="#1F2937" />
        ))}
        {values.map((item, index) => {
          const x = 50 + index * 68;
          const up = item.close >= item.open;
          return (
            <g key={`${asset.symbol}-${index}`}>
              <line
                x1={x}
                x2={x}
                y1={y(item.high)}
                y2={y(item.low)}
                stroke={up ? "#22C55E" : "#EF4444"}
                strokeWidth="3"
              />
              <rect
                x={x - 15}
                y={Math.min(y(item.open), y(item.close))}
                width="30"
                height={Math.max(Math.abs(y(item.open) - y(item.close)), 8)}
                rx="3"
                fill={up ? "#22C55E" : "#EF4444"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function AnalysisCard({ asset }) {
  const positive = asset.change >= 0;
  const sections = [
    {
      title: "Price Action",
      body: positive
        ? `${asset.label} is moving higher, which shows buyers are currently more active than sellers. The important beginner takeaway is to watch whether price can stay above recent support levels.`
        : `${asset.label} is under pressure today, which means sellers are controlling the short-term move. A single down day is not the whole story, so context matters.`
    },
    {
      title: "Volume Analysis",
      body:
        "Trading volume is a participation signal. Higher volume means more market participants are involved, which can make price movement more meaningful."
    },
    {
      title: "Momentum Analysis",
      body:
        "Momentum describes whether the move is gaining or losing strength. Smooth higher highs suggest healthier momentum, while sharp reversals suggest caution."
    },
    {
      title: "Risk Considerations",
      body:
        "Markets can react quickly to earnings, economic data, regulation, and sentiment. Beginners should separate learning from emotional decision-making."
    },
    {
      title: "Key Takeaways",
      body:
        "Focus on trend direction, volume confirmation, and volatility. InvestSimple explains what the movement means without turning it into a recommendation."
    }
  ];

  return (
    <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
      <h2 className="text-2xl font-bold text-white">InvestSimple Analysis</h2>
      <div className="mt-5 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-white">{section.title}</h3>
            <p className="mt-2 leading-7 text-gray-400">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PositionCard({
  asset,
  quantity,
  setQuantity,
  averagePrice,
  setAveragePrice,
  currentValue,
  profitLoss,
  returnPct
}) {
  const positive = profitLoss >= 0;

  return (
    <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
      <h2 className="text-xl font-bold text-white">User Position</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm text-gray-400">Quantity Owned</span>
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="w-full rounded-md border border-ink-800 bg-ink-950 px-3 py-3 text-white"
            inputMode="decimal"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm text-gray-400">Average Buy Price</span>
          <input
            value={averagePrice}
            onChange={(event) => setAveragePrice(event.target.value)}
            className="w-full rounded-md border border-ink-800 bg-ink-950 px-3 py-3 text-white"
            inputMode="decimal"
          />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Current Position" value={`${quantity || 0} ${asset.symbol}`} />
        <Metric label="Current Value" value={formatCurrency(currentValue, "stock")} />
        <Metric
          label="Profit/Loss"
          value={
            <span className={positive ? "text-gain" : "text-loss"}>
              {formatCurrency(profitLoss, "stock")}
            </span>
          }
        />
        <Metric
          label="Percentage Return"
          value={
            <span className={positive ? "text-gain" : "text-loss"}>
              {positive ? "+" : ""}
              {returnPct.toFixed(2)}%
            </span>
          }
        />
      </div>
      <div className="mt-5 rounded-md border border-ink-800 bg-ink-950 p-4">
        <p className="font-semibold text-white">InvestSimple Position Analysis</p>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          {positive
            ? `You remain above your average purchase price despite recent volatility in ${asset.symbol}.`
            : `Your position is currently below the entered average price, so it is useful to understand whether the move is broad-market pressure or asset-specific weakness.`}
        </p>
      </div>
    </section>
  );
}

function TechnicalBreakdown() {
  const [open, setOpen] = useState("RSI");
  const items = {
    RSI: "RSI measures buying pressure. Values above 70 often indicate heavy recent buying activity, while values below 30 can show heavy recent selling.",
    MACD: "MACD helps beginners see whether momentum is strengthening or fading by comparing shorter and longer price trends.",
    Volume: "Volume shows participation. A price move with stronger volume usually has more market attention behind it.",
    "Moving Averages":
      "Moving averages smooth price data so you can see the broader trend instead of every small price jump.",
    Volatility:
      "Volatility measures how much price moves around. Higher volatility means larger swings and more uncertainty."
  };

  return (
    <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
      <h2 className="text-xl font-bold text-white">Technical Breakdown</h2>
      <div className="mt-4 divide-y divide-ink-800">
        {Object.entries(items).map(([title, body]) => (
          <div key={title}>
            <button
              className="flex w-full items-center justify-between py-4 text-left font-semibold text-white"
              onClick={() => setOpen(open === title ? "" : title)}
            >
              {title}
              <ChevronDown
                size={18}
                className={`transition ${open === title ? "rotate-180 text-accent" : "text-gray-500"}`}
              />
            </button>
            {open === title && <p className="pb-4 leading-7 text-gray-400">{body}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CryptoBasics({ asset }) {
  return (
    <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
      <h2 className="text-xl font-bold text-white">Crypto Basics</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          {
            title: `What is ${asset.label}?`,
            body: `${asset.label} is a digital asset traded on crypto markets. Its value comes from market demand, network activity, liquidity, and investor sentiment.`
          },
          {
            title: `What affects ${asset.label} prices?`,
            body:
              "Crypto prices can react to regulation, interest rates, exchange liquidity, developer activity, security events, and social attention."
          },
          {
            title: "Why is cryptocurrency volatile?",
            body:
              "Crypto markets trade globally around the clock, and liquidity can change quickly. That can create larger price swings than many traditional assets."
          }
        ].map((item) => (
          <article key={item.title} className="rounded-md border border-ink-800 bg-ink-950 p-4">
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Watchlist({ onOpenAsset }) {
  const watchlist = [stocks[0], stocks[1], crypto[0], crypto[2]];
  return (
    <div className="space-y-6">
      <SectionHeader title="Saved Assets" caption="Quick access to your market understanding pages" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Stocks</h2>
          <AssetGrid assets={watchlist.filter((item) => item.type === "stock")} onOpenAsset={onOpenAsset} />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-bold text-white">Crypto</h2>
          <AssetGrid assets={watchlist.filter((item) => item.type === "crypto")} onOpenAsset={onOpenAsset} />
        </div>
      </div>
    </div>
  );
}

function LearnPage() {
  const [query, setQuery] = useState("");
  const terms = learnTerms.filter((item) =>
    `${item.term} ${item.title}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-ink-800 bg-ink-900 p-5 shadow-panel">
        <div className="flex items-center gap-3 rounded-md border border-ink-800 bg-ink-950 px-4">
          <Search size={20} className="text-gray-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-14 w-full bg-transparent text-white outline-none placeholder:text-gray-500"
            placeholder="What would you like to understand?"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {terms.map((item) => (
          <article key={item.term} className="rounded-lg border border-ink-800 bg-ink-900 p-5 shadow-panel">
            <p className="text-sm font-semibold text-accent">{item.term}</p>
            <h2 className="mt-2 text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-3 leading-7 text-gray-400">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent">
            <User size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Sathvika</h2>
            <p className="text-gray-400">Member since June 2026</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Metric label="Saved Watchlist Count" value="4" />
          <Metric label="Learning Terms Viewed" value="7" />
        </div>
      </section>
      <section className="rounded-lg border border-ink-800 bg-ink-900 p-6 shadow-panel">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          {[
            "Reviewed Apple price action and volume analysis",
            "Saved Bitcoin to watchlist",
            "Read beginner explanation for RSI",
            "Checked Solana volatility notes"
          ].map((activity) => (
            <div key={activity} className="flex items-center gap-3 rounded-md border border-ink-800 bg-ink-950 p-3">
              <Activity size={17} className="text-accent" />
              <span className="text-sm text-gray-300">{activity}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
