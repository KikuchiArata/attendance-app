'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Attendance = {
  id: string
  name: string
  email: string
  type: string
  created_at: string
}

export default function Home() {
  // 勤怠データ
  const [data, setData] = useState<Attendance[]>([])

  // loading
  const [loading, setLoading] = useState(true)

  // 入力ホーム
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ログイン中ユーザー
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // データ取得
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      //.order('created_at', { ascending: false })

    if (error) {
      console.error(error.message)
    } else {
      setData(data || [])
    }

    setLoading(false)
  }

  // 新規登録
  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      console.error(error.message)
      alert('登録失敗')
      return
    }

    // attendanceテーブルにも追加
    await supabase.from('attendance').insert([
      {
        name,
        email,
        type: 'register'
      }
    ])
    
    alert('登録成功')
  }

  // ログイン
  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error(error.message)
      alert('ログイン失敗')
      return
    }

    setUserEmail(data.user.email || null)

    alert('ログイン成功')
  }

  // ログアウト
  const logout = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
  }

  // 初回読み込み
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>勤怠一覧</h1>

      {/* ログイン状態 */}
      {userEmail ? (
        <p>ログイン中: {userEmail}</p>
      ) : (
        <p>ログインしていません</p>
      )}

      {/* 一覧 */}
      {data.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name} / {item.email} / {item.type}
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>認証</h2>

      {/* 名前 */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* メール */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* パスワード */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* ボタン */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={signUp}>
          新規登録
        </button>

        <button onClick={login}>
          ログイン
        </button>

        <button onClick={logout}>
          ログアウト
        </button>
      </div>
    </main>
  )
}