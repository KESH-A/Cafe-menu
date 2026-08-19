import { useState, useEffect } from 'react'
import './App.css'
import img1 from "./assets/double-espresso.jpg"
import img2 from "./assets/iced-caramel-latte.jpg"
import img3 from "./assets/berry-cheesecake.jpg"
import img4 from "./assets/artisanal-ice-cream.jpg"
import img5 from "./assets/avocado-toast.jpg"
import img6 from "./assets/Steak.jpg"
import {
  Coffee,
  IceCream,
  Menu,
  Utensils,
  Heart,
  ShoppingBag,
  Info,
  X,
  Plus,
  Sparkles
} from 'lucide-react'

const PRODUCTS = [
    {id:1,name:"Double Espresso",category:"coffee",price:4.5,desc:"Rich, concentrated shot with a bold crema finish",image:img1},
    {id:2,name:"Iced Caramel Latte",category:"coffee",price:6.0,desc:"Smooth espresso over ice with milk and caramel drizzle",image:img2},
    {id:3,name:"Berry Cheesecake",category:"desserts",price:7.9,desc:"Creamy baked cheesecake topped with mixed berry compote",image:img3},
    {id:4,name:"Artisanal Ice Cream",category:"desserts",price:5.0,desc:"Small-batch ice cream made fresh with natural ingredients",image:img4},
    {id:5,name:"Avocado Toast",category:"food",price:8.9,desc:"Sourdough toast with smashed avocado, chili flakes and lime",image:img5},
    {id:6,name:"Steak",category:"food",price:14.99,desc:"A classic, juicy steak cooked exactly the way you like it.",image:img6},


  ];


const tabs = [
   {id:"all",icon: Menu, label: "All"},
   {id:"coffee",icon: Coffee, label: "Coffee"},
   {id:"desserts",icon: IceCream, label: "Dessert"},
   {id:"food",icon: Utensils, label: "Food"},
   {id:"favorites",icon: Heart, label: "Favorites"},
];


function App() {
  const [activeTab,setActiveTab] = useState("all");
  const [favorites,setFavorites] = useState([]);
  const [cart,setCart] = useState([]);
  const [isCartOpen,setIsCartOpen] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState(null)
  const [isInfoOpen,setIsInfoOpen] = useState(false);
  const [isCartClosing,setIsCartClosing] = useState(false);
  const [isInfoClosing,setIsInfoClosing] = useState(false);
  const [isDetailClosing,setIsDetailClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
  typeof window !== 'undefined' ? window.innerWidth : 0
);


useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


if (windowWidth < 600) {
  var btnWidth = 60;
  var barHeight = 70;
  var barWidth = btnWidth * tabs.length;
  var bubbleSize = 50;
  var cornerRadius = 40;
  var edgeMargin = cornerRadius;
  var baseNotchRadius = 35;
  var notchSpread = 8;
} else {
  var btnWidth = 80;
  var barHeight = 70;
  var barWidth = btnWidth * tabs.length;
  var bubbleSize = 55;
  var cornerRadius = 40;
  var edgeMargin = cornerRadius;
  var baseNotchRadius = 44;
  var notchSpread = 12;
}

  const closeCart = () => {
    setIsCartClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setIsCartClosing(false);
    }, 220);
  };

  const closeInfo = () => {
    setIsInfoClosing(true);
    setTimeout(() => {
      setIsInfoOpen(false);
      setIsInfoClosing(false);
    }, 220);
  };


  const closeDetail = () => {
    setIsDetailClosing(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setIsDetailClosing(false);
    }, 220);
  };

  
  const toggleFavorite = (id) =>{
    if(favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !==id));
    } else {
      setFavorites([...favorites,id]);
    }
  };



const addToCart = (product) => {
  setCart([...cart,product]);
};


const filteredProducts = PRODUCTS.filter((item) => {
  if (activeTab === "favorites") {
    return favorites.includes(item.id);
  }
  else if(activeTab === "all"){
    return true;
  }
  return item.category === activeTab;
});



  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
    <div className="pb-28 pt-6 px-4 sm:px-6 md:px-8 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative font-sans">
        <header className="flex items-center justify-between mb-6 px-2">
            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent leading-tight pb-1">
                    Aura Lounge
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                    Delicious
                </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1 text-xs text-amber-400">
                <Sparkles size={14} />
                <span>MENU</span>
            </div>
        </header>


        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length === 0 ? (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-slate-500 text-sm">
                  {activeTab === "favorites" ? "No favorites yet." : "No items found."}
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isFav = favorites.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group hover:border-amber-500/30 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.classList.remove("hidden");
                          e.currentTarget.nextElementSibling.classList.add("flex");
                        }
                      }}
                    />
                    <div className="w-full h-full hidden items-center justify-center text-slate-600">
                      <IceCream size={22} />
                    </div>
                  </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-100 text-base truncate">{product.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{product.desc}</p>
                        <span className="inline-block mt-3 font-bold text-amber-400 text-sm">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => toggleFavorite(product.id)}
                          className={`p-2.5 rounded-full border transition-all duration-300 ease-in-out cursor-pointer active:scale-90 ${
                            isFav
                            ? "bg-rose-500/20 border-rose-500/40 text-rose-500 scale-105"
                            : "bg-white/5 border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-400/30"
                          }`}                          
                        >
                          <Heart size={18} fill={isFav ? "currentColor" : "none"}/>
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full font-bold transition-all duration-300 ease-in-out active:scale-90 hover:scale-105 shadow-lg shadow-amber-500/20 cursor-pointer"
                        >
                          <Plus size={18} />
                        </button>
                    </div>
                  </div>
                );
              })
            )}
        </main>

        <div 
          className={`fixed left-4 sm:left-6 z-40 transition-all duration-300 ease-in-out ${(isCartOpen || isInfoOpen) ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}`}
          style={{ bottom: `${barHeight + 24 + 5}px` }}
        >
            <button
              onClick={() => isInfoOpen ? closeInfo() : setIsInfoOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900/90 border border-white/20 text-slate-200 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md hover:bg-slate-800 hover:scale-105 transition-all duration-300 ease-in-out active:scale-90 cursor-pointer"  
            >
              <Info size={20} />
            </button>
        </div>

        <div 
          className={`fixed right-4 sm:right-6 z-40 transition-all duration-300 ease-in-out ${(isCartOpen || isInfoOpen) ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}`}
          style={{ bottom: `${barHeight + 24 + 5}px` }}
        >
          <button
            onClick={() => isCartOpen ? closeCart() : setIsCartOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/20 font-bold transition-all duration-300 ease-in-out active:scale-90 hover:scale-105 relative cursor-pointer"
          >
            <ShoppingBag size={20}/>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold animate-pulse">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-in-out ${(isCartOpen || isInfoOpen) ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}`}>
        {(() => {
          const tabs = [
            {id:"all",icon: Menu, label: "All"},
            {id:"coffee",icon: Coffee, label: "Coffee"},
            {id:"desserts",icon: IceCream, label: "Dessert"},
            {id:"food",icon: Utensils, label: "Food"},
            {id:"favorites",icon: Heart, label: "Favorites"},
          ];
          const activeIndex = tabs.findIndex((t) => t.id === activeTab);
          const isEdgeTab = activeIndex === 0 || activeIndex === tabs.length - 1;
          const effectiveNotchSpread = isEdgeTab ? 0 : notchSpread;

          const notchCenterX = btnWidth * activeIndex + btnWidth / 2;
          const roomLeft = notchCenterX - edgeMargin;
          const roomRight = (barWidth - edgeMargin) - notchCenterX;
          const notchRadius = Math.max(Math.min(roomLeft, roomRight, baseNotchRadius), 18);
          const dipDepth = isEdgeTab ? 0 : notchRadius * 0.72;
          const notchLeftOuter = notchCenterX - notchRadius - effectiveNotchSpread;
          const notchRightOuter = notchCenterX + notchRadius + effectiveNotchSpread;

          const bubbleTop = isEdgeTab
            ? barHeight - bubbleSize - 10
            : -(bubbleSize - dipDepth) + 6;

          const notchPath = `
            M0,${cornerRadius}
            Q0,0 ${cornerRadius},0
            L${notchLeftOuter},0
            C${notchCenterX - notchRadius},0 ${notchCenterX - notchRadius * 0.5},${dipDepth} ${notchCenterX},${dipDepth}
            C${notchCenterX + notchRadius * 0.5},${dipDepth} ${notchCenterX + notchRadius},0 ${notchRightOuter},0
            L${barWidth - cornerRadius},0
            Q${barWidth},0 ${barWidth},${cornerRadius}
            L${barWidth},${barHeight - cornerRadius}
            Q${barWidth},${barHeight} ${barWidth - cornerRadius},${barHeight}
            L${cornerRadius},${barHeight}
            Q0,${barHeight} 0,${barHeight - cornerRadius}
            Z
          `;

          return (
            <div className="relative" style={{ width: `${barWidth}px`, height: `${barHeight}px`,transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}}>
              <svg
                width={barWidth}
                height={barHeight}
                viewBox={`0 0 ${barWidth} ${barHeight}`}
                className="absolute inset-0 drop-shadow-2xl overflow-visible"
              >
                <path
                  d={notchPath}
                  fill="rgba(15, 23, 42, 0.94)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  style={{ transition: 'd 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                />
              </svg>

              <div
                className="absolute rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 pointer-events-none flex items-center justify-center"
                style={{
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`,
                top: `${bubbleTop}px`,
                left: `${btnWidth / 2 - bubbleSize / 2}px`,
                transform: `translateX(${activeIndex * btnWidth}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {(() => {
                  const ActiveIcon = tabs[activeIndex].icon;
                  return <ActiveIcon size={24} className="text-slate-950" fill={tabs[activeIndex].id === "favorites" ? "currentColor" : "none"} />;
                })()}
              </div>

              <div className="absolute inset-0 flex items-end pb-3.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{ width: `${btnWidth}px` }}
                      className="relative h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-90 transition-transform duration-200 shrink-0"
                    >
                      {!isActive && (
                        <>
                          <Icon size={20} className="text-slate-400 hover:text-slate-200 transition-colors duration-200" />
                          <span className="w-1 h-1 rounded-full bg-slate-600" />
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}
        </nav>

  {selectedProduct && (
    <div
      onClick={closeDetail}
      className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${
        isDetailClosing ? "animate-[fadeOut_0.2s_ease-in_forwards]" : "animate-[fadeIn_0.2s_ease-out]"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-900 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative ${
          isDetailClosing
            ? "animate-[slideDown_0.22s_ease-in_forwards] sm:animate-[scaleOut_0.2s_ease-in_forwards]"
            : "animate-[slideUp_0.3s_ease-out] sm:animate-[scaleIn_0.25s_ease-out]"
        }`}
      >
        <div className="relative h-64">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          <button
            onClick={closeDetail}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-100">{selectedProduct.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{selectedProduct.desc}</p>
          <span className="text-xl font-bold text-amber-400 mt-3 inline-block">
            ${selectedProduct.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )}

        {isInfoOpen && (
          <div
            onClick={closeInfo}
            className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
              isInfoClosing ? "animate-[fadeOut_0.2s_ease-in_forwards]" : "animate-[fadeIn_0.2s_ease-out]"
            }`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-slate-900 border border-white/15 p-6 rounded-3xl max-w-xs sm:max-w-sm w-full relative shadow-2xl ${
                isInfoClosing ? "animate-[scaleOut_0.2s_ease-in_forwards]" : "animate-[scaleIn_0.25s_ease-out]"
              }`}
            >
              <button
                onClick={closeInfo}
                className="absolute top-4 right-4 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-amber-400 mb-3 mt-3">About Us</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">Aura Lounge is a boutique venue that brings together the highest quality coffee beans and fresh desserts.
              </p>
              <h3 className="text-sm font-semibold text-slate-200 mb-1">communication</h3>
              <p className="text-xs text-slate-400">Turkmenistan / Mary</p>
              <p className="text-xs text-slate-400 mt-1">+99369693169</p>
            </div>
          </div>
        )}

        {isCartOpen && (
          <div
            onClick={closeCart}
            className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 ${
              isCartClosing ? "animate-[fadeOut_0.2s_ease-in_forwards]" : "animate-[fadeIn_0.2s_ease-out]"
            }`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-slate-900 border-t sm:border border-white/15 p-6 rounded-t-3xl sm:rounded-3xl max-w-md w-full min-h-[45vh] sm:min-h-0 max-h-[85vh] sm:max-h-[80vh] overflow-y-auto relative shadow-2xl flex flex-col ${
                isCartClosing
                  ? "animate-[slideDown_0.22s_ease-in_forwards] sm:animate-[scaleOut_0.2s_ease-in_forwards]"
                  : "animate-[slideUp_0.3s_ease-out] sm:animate-[scaleIn_0.25s_ease-out]"
              }`}
              style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-amber-400" />
                  Cart ({cart.length})
                </h2>
                <button
                  onClick={closeCart}
                  className="text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xs text-slate-500 text-center">Your cart is empty.</p>
                </div>
              ): (
                <div className="space-y-3">
                  {cart.map((item,index) => (
                    <div key={index} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.name}</p>
                        <p className="text-xs text-amber-400 font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between text-sm font-bold text-slate-100 mb-4">
                      <span>Total: </span>
                      <span className="text-amber-400">
                        ${cart.reduce((sum,item) => sum + item.price , 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all duration-300 ease-in-out active:scale-95 hover:scale-[1.02] shadow-lg shadow-amber-500/20 cursor-pointer">
                  Complete the order
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
    </div>
  );
}

export default App