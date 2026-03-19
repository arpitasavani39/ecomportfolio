"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  const shipping = cartTotal > 50 || cartCount === 0 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "+916351277099"; // Placeholder number, replace with actual
    const message = `Hello Lucerna! I'd like to place an order:
${cart.map((item) => `- ${item.name} (${item.quantity}x) - $${item.price * item.quantity}.00`).join("\n")}

Subtotal: $${cartTotal}.00
Shipping: ${shipping === 0 ? "FREE" : `$${shipping}.00`}
Total: $${total}.00

Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
            Your <span className="text-[#9caa9a]">Shopping Bag</span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            {cartCount === 0 
              ? "Your bag is empty. Let's find something special for you." 
              : `You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your bag.`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-8 text-7xl opacity-20">🛍️</div>
            <h2 className="text-2xl font-bold text-zinc-800">Bag is feeling a bit light</h2>
            <p className="mt-2 text-zinc-500">Add some hand-poured magic to your space.</p>
            <Link
              href="/products"
              className="mt-8 rounded-full bg-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 transition-all hover:shadow-md sm:p-6"
                  >
                    {/* Item Image */}
                    <Link href={`/products/${item.id}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f0ede8] sm:h-32 sm:w-32">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform hover:scale-110"
                      />
                    </Link>

                    {/* Item Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/products/${item.id}`} className="text-lg font-bold text-zinc-900 hover:text-[#9caa9a] transition-colors">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm font-medium text-zinc-500">${item.price}.00</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex h-10 w-28 items-center justify-between rounded-full border border-zinc-200 px-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-lg font-medium text-zinc-400 hover:text-zinc-900"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold text-zinc-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-lg font-medium text-zinc-400 hover:text-zinc-900"
                          >
                            +
                          </button>
                        </div>
                        
                        <p className="text-base font-bold text-zinc-900">${item.price * item.quantity}.00</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-100">
                <h2 className="mb-6 text-xl font-bold text-zinc-900">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-900">${cartTotal}.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-zinc-900">
                      {shipping === 0 ? "FREE" : `$${shipping}.00`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-zinc-400">
                      Add ${50 - cartTotal}.00 more to qualify for FREE shipping!
                    </p>
                  )}
                  <div className="my-6 border-t border-zinc-100 pt-6">
                    <div className="flex justify-between text-lg font-bold text-zinc-900">
                      <span>Total</span>
                      <span>${total}.00</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="mt-8 block w-full rounded-full bg-[#9caa9a] py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#8b9b89] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Checkout with WhatsApp
                </button>


                {/* Trust Badges */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-8">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400">Secure Payment</p>
                    <div className="mt-2 flex justify-center gap-1 opacity-50">
                       <span className="text-lg">💳</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400">Eco Friendly</p>
                    <p className="mt-2 text-lg">🌿</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Suggested Products (If cart not empty) */}
      {cart.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="mb-10 text-2xl font-bold text-zinc-900">While you&apos;re here...</h2>
             {/* We can just link to products for now or use a small carousel if available */}
             <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-[#9caa9a] hover:underline">
               Explore more hand-poured candles →
             </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
