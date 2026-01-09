import { useState } from "react"

type CreateOrderPayload = {
  po_code: string
  id_user: string
  po_type: string
  date_po: string
  po_status: string
  note: string
}

export function useCreateOrder() {
    const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrder = async (payload: CreateOrderPayload) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Gagal membuat order")
      }

      return await res.json()
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan order")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createOrder,
    isLoading,
    error,
  }
}