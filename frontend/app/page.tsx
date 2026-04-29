'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Attendance = {
  id: string
  type: string
  created_at: string
}

export default function Home() {
  const [data, setData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')

      if (error) {
        console.error(error.message)
      } else {
        setData(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>勤怠一覧</h1>

      {data.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.type}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
