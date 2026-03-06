export const lessons = [
  {
    chapter: "Ch.1: Welcome",
    title: "ようこそ",
    description: `
<h2>Elixir Tour へようこそ</h2>
<p>このチュートリアルでは、Elixir プログラミング言語の基本から応用まで学びます。</p>
<p>右側のエディタにコードが表示されています。<strong>Run</strong> ボタンを押すと、ブラウザ上で直接 Elixir コードが実行されます。</p>
<p>コードを自由に編集して、いろいろ試してみましょう！</p>
<h3>IO.puts / IO.inspect</h3>
<p><code>IO.puts/1</code> は文字列を標準出力に表示します。<code>IO.inspect/2</code> は任意の値をデバッグ表示します。</p>
<p><strong>← / →</strong> ボタンかドロップダウンでページを移動できます。<br><strong>Ctrl+Enter</strong> でコードを実行できます。</p>
`,
    defaultCode: `# Hello World!
IO.puts("Hello, Elixir!")

# 文字列補間
name = "World"
IO.puts("Hello, \#{name}!")

# 計算結果の表示
IO.puts("1 + 2 = \#{1 + 2}")

# IO.inspect で任意の値を表示
IO.inspect([1, 2, 3], label: "リスト")
IO.inspect(%{a: 1, b: 2}, label: "マップ")

# 最後の式の値が => の後に表示されます
"Welcome to Elixir Tour!"`,
  },
  {
    chapter: "Ch.1: Welcome",
    title: "IEx で試す",
    description: `
<h2>IEx — インタラクティブ Elixir</h2>
<p>IEx（Interactive Elixir）は Elixir の REPL（対話型実行環境）です。ターミナルで <code>iex</code> と入力すると起動します。</p>
<h3>便利なコマンド</h3>
<ul>
  <li><code>h Module.function/arity</code> — ドキュメントを表示（例: <code>h String.split/2</code>）</li>
  <li><code>i value</code> — 値の詳細情報を表示</li>
  <li><code>v(n)</code> — n番目の結果を再利用</li>
  <li><code>c "file.exs"</code> — ファイルをコンパイル&ロード</li>
  <li><code>r Module</code> — モジュールをリロード</li>
</ul>
<h3>このツアーについて</h3>
<p>右のエディタで Elixir コードを書いて <strong>Run</strong>（または <kbd>Ctrl+Enter</kbd>）で実行します。コードはブラウザ内の WASM Elixir VM で動作します。</p>
`,
    defaultCode: `# IEx での基本操作をシミュレート

# 式の評価（結果は => の後に表示されます）
1 + 1

# 変数への束縛
x = 42
y = x * 2

# 型情報の確認（iex の i コマンドに相当）
IO.inspect(42,       label: "integer")
IO.inspect(3.14,     label: "float")
IO.inspect(:hello,   label: "atom")
IO.inspect("world",  label: "string")
IO.inspect([1,2,3],  label: "list")
IO.inspect({:ok, 1}, label: "tuple")

# 最後の式が返り値として表示される
{:welcome, "Elixir!"}`,
  },
  {
    chapter: "Ch.1: Welcome",
    title: "Elixir の特徴",
    description: `
<h2>Elixir の特徴</h2>
<p>Elixir は Erlang VM（BEAM）上で動作する関数型プログラミング言語です。</p>
<h3>主な特徴</h3>
<ul>
  <li><strong>不変性</strong> — 変数は再束縛できますが、値は変更されません</li>
  <li><strong>パターンマッチ</strong> — <code>=</code> はマッチ演算子。構造分解が自然に書けます</li>
  <li><strong>軽量プロセス</strong> — 数百万プロセスを並行実行できます</li>
  <li><strong>OTP</strong> — 耐障害性の高いシステムを構築するフレームワーク</li>
  <li><strong>関数型</strong> — 副作用を最小化し、データ変換をパイプで表現</li>
</ul>
<h3>このツアーの構成</h3>
<table>
  <tr><td><strong>Ch.2</strong></td><td>基本型と値</td></tr>
  <tr><td><strong>Ch.3</strong></td><td>パターンマッチ</td></tr>
  <tr><td><strong>Ch.4</strong></td><td>関数とモジュール</td></tr>
  <tr><td><strong>Ch.5</strong></td><td>制御フロー</td></tr>
  <tr><td><strong>Ch.6</strong></td><td>コレクションと Enum</td></tr>
  <tr><td><strong>Ch.7</strong></td><td>文字列とバイナリ</td></tr>
  <tr><td><strong>Ch.8</strong></td><td>プロセスと並行性</td></tr>
  <tr><td><strong>Ch.9</strong></td><td>OTP と GenServer</td></tr>
  <tr><td><strong>Ch.10</strong></td><td>プロトコルとビヘイビア</td></tr>
  <tr><td><strong>Ch.11</strong></td><td>型仕様とメタプログラミング</td></tr>
</table>
`,
    defaultCode: `# Elixir の哲学を体験してみましょう

# 1. 不変性 — 変数は「再束縛」されます（値は変わらない）
x = [1, 2, 3]
y = [0 | x]     # 新しいリストを作る。x は変わらない
IO.inspect(x, label: "x")
IO.inspect(y, label: "y")

# 2. パターンマッチ — = はマッチ演算子
{:ok, value} = {:ok, 42}
IO.puts("matched value: \#{value}")

# 3. パイプ演算子 — データ変換を左から右に
result =
  1..10
  |> Enum.filter(&(rem(&1, 2) == 0))
  |> Enum.map(&(&1 * &1))
  |> Enum.sum()
IO.puts("偶数の二乗の合計: \#{result}")

# 4. 関数型スタイル — 副作用なし
double = fn x -> x * 2 end
triple = fn x -> x * 3 end
compose = fn f, g -> fn x -> f.(g.(x)) end end

sextuple = compose.(double, triple)
IO.puts("sextuple(5) = \#{sextuple.(5)}")`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "基本型",
    description: `
<h2>基本型</h2>
<p>Elixir には以下の基本的なデータ型があります：</p>
<ul>
  <li><strong>整数</strong> - <code>42</code>, <code>0xFF</code>, <code>0b1010</code>, <code>1_000_000</code></li>
  <li><strong>浮動小数点数</strong> - <code>3.14</code>, <code>1.0e-10</code></li>
  <li><strong>文字列</strong> - <code>"hello"</code>（UTF-8 エンコード）</li>
  <li><strong>アトム</strong> - <code>:hello</code>, <code>:ok</code>, <code>:error</code></li>
  <li><strong>ブーリアン</strong> - <code>true</code>, <code>false</code>（実は <code>:true</code>, <code>:false</code> アトム）</li>
  <li><strong>nil</strong> - <code>nil</code>（実は <code>:nil</code> アトム）</li>
</ul>
<p><code>is_integer/1</code>, <code>is_float/1</code>, <code>is_atom/1</code> などで型を確認できます。</p>
<p>整数は任意精度（ビッグナム）対応です。</p>
`,
    defaultCode: `# 整数（様々な表記）
IO.puts(42)           # 10進数
IO.puts(0xFF)         # 16進数 = 255
IO.puts(0b1010)       # 2進数 = 10
IO.puts(1_000_000)    # アンダースコアで区切り可能

# 浮動小数点数
IO.puts(3.14)
IO.puts(1.0e-10)

# 文字列
IO.puts("こんにちは、世界！")

# アトム
IO.inspect(:hello)
IO.inspect(:ok)

# ブーリアン（アトムの一種）
IO.puts(true == :true)

# nil
IO.puts(nil == :nil)

# 型チェック
IO.puts("42 is integer? \#{is_integer(42)}")
IO.puts("3.14 is float? \#{is_float(3.14)}")
IO.puts(":hello is atom? \#{is_atom(:hello)}")

# 任意精度整数
IO.inspect(2 ** 64)`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "演算子",
    description: `
<h2>演算子</h2>
<h3>算術演算子</h3>
<p><code>+</code> <code>-</code> <code>*</code> <code>/</code>（常に float を返す）、<code>div/2</code>（整数除算）、<code>rem/2</code>（剰余）</p>
<h3>比較演算子</h3>
<p><code>==</code> <code>!=</code> <code>===</code>（型も厳密）<code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code></p>
<p>型の比較順序: <code>number &lt; atom &lt; reference &lt; function &lt; port &lt; pid &lt; tuple &lt; list &lt; bitstring</code></p>
<h3>論理演算子</h3>
<p><code>and</code> <code>or</code> <code>not</code>（ブーリアン専用）<br>
<code>&amp;&amp;</code> <code>||</code> <code>!</code>（任意の値で使用可能）</p>
<h3>文字列・リスト演算子</h3>
<p><code>&lt;&gt;</code> 文字列連結、<code>++</code> リスト連結、<code>--</code> リスト差分</p>
`,
    defaultCode: `# 算術演算子
IO.puts(10 + 3)      # 13
IO.puts(10 - 3)      # 7
IO.puts(10 * 3)      # 30
IO.puts(10 / 3)      # 3.333... (常にfloat)
IO.puts(div(10, 3))  # 3 (整数除算)
IO.puts(rem(10, 3))  # 1 (剰余)
IO.puts(abs(-42))    # 42

# 比較演算子
IO.puts(1 == 1.0)    # true  (値比較)
IO.puts(1 === 1.0)   # false (型も厳密)
IO.puts(1 != 2)      # true

# 異なる型の比較（型の順序に従う）
IO.puts(1 < :atom)   # true (number < atom)

# 論理演算子 (boolean専用)
IO.puts(true and false)
IO.puts(true or false)
IO.puts(not true)

# && || ! (truthy/falsy値で使用可能)
IO.puts(nil || "デフォルト値")   # "デフォルト値"
IO.puts("値" && "別の値")        # "別の値"
IO.puts(!nil)                    # true
IO.puts(!false)                  # true
IO.puts(!0)                      # false (0はtruthyに注意！)

# 文字列・リスト演算子
IO.puts("Hello" <> " " <> "World")
IO.inspect([1, 2] ++ [3, 4])
IO.inspect([1, 2, 3, 2, 1] -- [2])`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "変数と不変性",
    description: `
<h2>変数と不変性</h2>
<p>Elixir の変数は <strong>不変（immutable）</strong> です。変数を「更新」すると、実際には新しい値に<strong>再束縛</strong>されます。元の値は変わりません。</p>
<h3>再束縛</h3>
<p><code>x = 1</code> の後に <code>x = 2</code> と書くと、<code>x</code> は <code>2</code> に再束縛されます。ただし以前の値 <code>1</code> を参照していた他の変数には影響しません。</p>
<h3>アンダースコア変数</h3>
<p><code>_</code> は「使わない値」を示します。<code>_name</code> のように接頭辞として使うこともできます。</p>
<h3>変数のスコープ</h3>
<p>変数のスコープは定義されたブロック内です。<code>if</code>、<code>case</code>、<code>fn</code> などのブロック内で定義した変数はそのブロック外からも見えます（Elixir はスコープが広め）。</p>
`,
    defaultCode: `# 変数への束縛
x = 42
IO.puts("x = \#{x}")

# 再束縛（不変性：元の値は変わっていない）
y = x        # y は x の値（42）を参照
x = 100      # x を再束縛
IO.puts("x = \#{x}")  # 100
IO.puts("y = \#{y}")  # 42（y は変わっていない）

# リストも同様
list = [1, 2, 3]
new_list = [0 | list]  # list に影響せず新しいリストを作る
IO.inspect(list,     label: "list")
IO.inspect(new_list, label: "new_list")

# アンダースコア（使わない値）
{_, second, _} = {1, 2, 3}
IO.puts("second = \#{second}")

# 複数の変数を同時に束縛（タプル分解）
{a, b, c} = {10, 20, 30}
IO.puts("\#{a}, \#{b}, \#{c}")

# 変数名の慣習：スネークケース
user_name = "Alice"
is_admin  = false
max_retry = 3
IO.inspect({user_name, is_admin, max_retry})`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "整数と浮動小数点数",
    description: `
<h2>整数と浮動小数点数</h2>
<h3>整数</h3>
<p>Elixir の整数は任意精度（ビッグナム）です。オーバーフローしません。</p>
<ul>
  <li>10進数: <code>42</code>, <code>1_000_000</code>（アンダースコア区切り）</li>
  <li>16進数: <code>0xFF</code></li>
  <li>8進数: <code>0o77</code></li>
  <li>2進数: <code>0b1010</code></li>
</ul>
<h3>浮動小数点数</h3>
<p>IEEE 754 倍精度。必ず小数点が必要（<code>1.0</code>、<code>1.0e10</code>）。</p>
<h3>算術</h3>
<p><code>/</code> は常に float を返します。整数除算は <code>div/2</code>、剰余は <code>rem/2</code>。</p>
`,
    defaultCode: `# 整数リテラル
IO.puts(1_000_000)     # 1000000
IO.puts(0xFF)          # 255
IO.puts(0o77)          # 63
IO.puts(0b11111111)    # 255

# 任意精度整数
IO.inspect(2 ** 100)
IO.puts(factorial = Enum.reduce(1..20, 1, &*/2))

# 浮動小数点
IO.puts(3.14)
IO.puts(1.0e-10)
IO.puts(1.5e3)         # 1500.0

# 算術
IO.puts(10 / 3)        # 3.3333... (float)
IO.puts(div(10, 3))    # 3 (整数除算)
IO.puts(rem(10, 3))    # 1 (剰余)
IO.puts(abs(-42))      # 42

# 整数 <-> 浮動小数点変換
IO.puts(trunc(3.7))    # 3 (切り捨て)
IO.puts(round(3.7))    # 4 (四捨五入)
IO.puts(floor(3.7))    # 3
IO.puts(ceil(3.2))     # 4
IO.puts(1 * 1.0)       # 1.0 (整数→float)
IO.puts(trunc(3.14))   # 3   (float→整数)

# 数学関数（:math モジュール）
IO.puts(:math.sqrt(16))
IO.puts(:math.pi())
IO.puts(:math.log(1))`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "アトムとブーリアン",
    description: `
<h2>アトムとブーリアン</h2>
<h3>アトム</h3>
<p>アトムは名前が値そのものである定数です。コロン（<code>:</code>）で始まります。</p>
<ul>
  <li><code>:ok</code>, <code>:error</code>, <code>:hello</code> など</li>
  <li>モジュール名もアトムです: <code>String</code> は <code>:"Elixir.String"</code></li>
  <li>アトムはガベージコレクションされません（アトムテーブルに蓄積）</li>
</ul>
<h3>ブーリアン</h3>
<p><code>true</code> と <code>false</code> は実はアトム（<code>:true</code>, <code>:false</code>）です。<br>
<strong>falsy な値は <code>false</code> と <code>nil</code> だけ</strong>です（<code>0</code>、<code>""</code>、<code>[]</code> はすべて truthy）。</p>
`,
    defaultCode: `# アトムの基本
IO.inspect(:ok)
IO.inspect(:error)
IO.inspect(:hello_world)

# アトムは == で比較
IO.puts(:ok == :ok)     # true
IO.puts(:ok == :error)  # false

# モジュール名はアトム
IO.puts(is_atom(String))
IO.inspect(String)

# ブーリアン（アトムの一種）
IO.puts(true == :true)   # true
IO.puts(false == :false) # true
IO.puts(is_atom(true))   # true

# falsy は false と nil だけ！
check = fn v -> if v, do: "truthy", else: "falsy" end
IO.puts(check.(false))  # falsy
IO.puts(check.(nil))    # falsy
IO.puts(check.(0))      # truthy (注意！)
IO.puts(check.(""))     # truthy (注意！)
IO.puts(check.([]))     # truthy (注意！)

# ブール演算子
IO.puts(true and false)   # false (boolean専用)
IO.puts(true or false)    # true
IO.puts(not true)         # false
IO.puts(nil || "default") # "default" (&&/|| は任意値)
IO.puts(false && "never") # false`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "タプル",
    description: `
<h2>タプル</h2>
<p>タプルは固定長の順序付きコレクションです。メモリ上に連続して配置されるため、インデックスアクセスが O(1) です。</p>
<h3>使いどころ</h3>
<ul>
  <li>関数の戻り値パターン: <code>{:ok, value}</code> / <code>{:error, reason}</code></li>
  <li>複数の値を一時的にまとめる</li>
  <li>パターンマッチで構造を検査する</li>
</ul>
<h3>注意</h3>
<p>タプルの更新は O(n) です（新しいタプルを生成）。頻繁な更新には不向きです。</p>
`,
    defaultCode: `# タプルの作成
t = {1, "hello", :ok}
IO.inspect(t)

# 要素アクセス（0始まり）
IO.puts(elem(t, 0))   # 1
IO.puts(elem(t, 1))   # "hello"
IO.puts(elem(t, 2))   # ok

# サイズ
IO.puts(tuple_size(t))   # 3

# 要素の更新（新しいタプルを返す）
t2 = put_elem(t, 1, "world")
IO.inspect(t2)
IO.inspect(t)  # 元は変わらない

# タプルをリストに変換
IO.inspect(Tuple.to_list(t))

# 関数の戻り値パターン（最重要な使い方）
parse = fn str ->
  case Integer.parse(str) do
    {n, ""}  -> {:ok, n}
    {n, rem} -> {:ok_with_remainder, n, rem}
    :error   -> {:error, "invalid: \#{str}"}
  end
end

IO.inspect(parse.("42"))
IO.inspect(parse.("42abc"))
IO.inspect(parse.("abc"))

# パターンマッチで安全に扱う
case File.read("/nonexistent") do
  {:ok, content}   -> IO.puts("内容: \#{content}")
  {:error, reason} -> IO.puts("エラー: \#{reason}")
end`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "リスト",
    description: `
<h2>リスト</h2>
<p>Elixir のリストは<strong>連結リスト</strong>です。先頭への追加が O(1)、末尾アクセスが O(n) です。</p>
<h3>構造</h3>
<p>リスト <code>[1, 2, 3]</code> の実体は <code>[1 | [2 | [3 | []]]]</code>（再帰的なペア構造）。</p>
<h3>パターンマッチとの組み合わせ</h3>
<p><code>[head | tail] = list</code> で先頭と残りを分解できます。これが再帰処理の基本パターンです。</p>
`,
    defaultCode: `# リストの作成
list = [1, 2, 3, 4, 5]
IO.inspect(list)

# 先頭への追加（O(1) - 効率的）
IO.inspect([0 | list])

# hd（先頭）と tl（残り）
IO.puts(hd(list))          # 1
IO.inspect(tl(list))       # [2, 3, 4, 5]

# 連結と差分
IO.inspect([1, 2] ++ [3, 4])      # [1, 2, 3, 4]
IO.inspect([1, 2, 3, 2] -- [2])   # [1, 3, 2]（最初の1つを削除）

# リストの操作
IO.puts(length(list))      # 5
IO.inspect(Enum.reverse(list))
IO.inspect(List.flatten([1, [2, 3], [4, [5]]]))

# パターンマッチで分解
[first | rest] = list
IO.puts("first: \#{first}")
IO.inspect(rest, label: "rest")

[a, b | others] = list
IO.puts("a=\#{a}, b=\#{b}")
IO.inspect(others)

# リストかどうか確認
IO.puts(is_list(list))     # true
IO.puts(is_list({1, 2}))   # false（タプルはリストではない）

# キャラクタリスト（シングルクォート）※ 文字コードのリスト
charlist = ~c"hello"
IO.inspect(charlist)          # [104, 101, 108, 108, 111]`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "マップ",
    description: `
<h2>マップ</h2>
<p>マップは <code>%{key => value}</code> 形式のキーバリューストアです。任意の型をキーに使えます。</p>
<h3>アトムキーのショートカット</h3>
<p>キーがアトムの場合、<code>%{name: "Alice"}</code> と書けます（<code>%{:name => "Alice"}</code> と同じ）。</p>
<h3>アクセス</h3>
<ul>
  <li>アトムキー: <code>map.key</code> または <code>map[:key]</code></li>
  <li>任意のキー: <code>map[key]</code>（存在しない場合は <code>nil</code>）</li>
  <li><code>Map.get/3</code>: デフォルト値を指定できる</li>
</ul>
`,
    defaultCode: `# マップの作成
user = %{name: "Alice", age: 30, city: "Tokyo"}
IO.inspect(user)

# アクセス方法
IO.puts(user.name)            # ドット記法（アトムキー専用）
IO.puts(user[:age])           # ブラケット記法
IO.puts(user[:email])         # nil（存在しないキー）
IO.puts(Map.get(user, :email, "N/A"))  # デフォルト値

# 更新（新しいマップを返す）
updated = %{user | age: 31}
IO.inspect(updated)
IO.inspect(user)  # 元は変わらない

# キーの追加・削除
with_email = Map.put(user, :email, "alice@example.com")
IO.inspect(with_email)
without_city = Map.delete(user, :city)
IO.inspect(without_city)

# マップのメタ操作
IO.inspect(Map.keys(user))
IO.inspect(Map.values(user))
IO.puts(Map.has_key?(user, :name))
IO.puts(map_size(user))

# 任意のキー型
mixed = %{"string_key" => 1, 42 => "number key", :atom_key => true}
IO.inspect(mixed)
IO.puts(mixed["string_key"])
IO.puts(mixed[42])

# Map.merge
extra = %{hobby: "coding", lang: "Elixir"}
IO.inspect(Map.merge(user, extra))`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "キーワードリスト",
    description: `
<h2>キーワードリスト</h2>
<p>キーワードリストは <code>[key: value]</code> 形式のリストです。実体は <code>[{:key, value}]</code> のタプルリストです。</p>
<h3>特徴</h3>
<ul>
  <li>順序が保持される（マップは順序なし）</li>
  <li>同じキーを複数持てる</li>
  <li>主に関数のオプション引数として使う</li>
  <li>最後の引数がキーワードリストなら <code>[]</code> を省略できる</li>
</ul>
<h3>マップとの使い分け</h3>
<p>オプション引数 → キーワードリスト、汎用なデータ → マップ</p>
`,
    defaultCode: `# キーワードリストの作成
opts = [timeout: 5000, retry: 3, verbose: true]
IO.inspect(opts)

# アクセス
IO.puts(opts[:timeout])
IO.puts(Keyword.get(opts, :retry))
IO.puts(Keyword.get(opts, :missing, "default"))

# 実体はタプルのリスト
IO.inspect(opts == [{:timeout, 5000}, {:retry, 3}, {:verbose, true}])

# 同じキーを複数持てる（マップと違う点）
dup = [a: 1, b: 2, a: 3]
IO.puts(dup[:a])          # 最初の値（1）
IO.inspect(Keyword.get_values(dup, :a))  # [1, 3]

# 更新
updated = Keyword.put(opts, :timeout, 10000)
IO.inspect(updated)
deleted = Keyword.delete(opts, :verbose)
IO.inspect(deleted)

# 関数のオプション引数として（最後の引数は [] 省略可）
defmodule Logger do
  def log(msg, opts \\\\ []) do
    level = Keyword.get(opts, :level, :info)
    tag   = Keyword.get(opts, :tag, "APP")
    IO.puts("[\#{level}][\#{tag}] \#{msg}")
  end
end

Logger.log("起動しました")
Logger.log("エラー発生", level: :error, tag: "AUTH")
Logger.log("デバッグ情報", level: :debug)`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "範囲（Range）",
    description: `
<h2>範囲（Range）</h2>
<p><code>first..last</code> で範囲を作成します。<code>Enum</code> や <code>for</code> と組み合わせて使うことが多いです。</p>
<h3>ステップ付き範囲</h3>
<p>Elixir 1.12 以降、<code>first..last//step</code> でステップを指定できます。</p>
<h3>降順範囲</h3>
<p><code>5..1</code> は降順の範囲ですが、<code>Enum.to_list</code> で使う場合は <code>5..1//-1</code> が必要です。</p>
`,
    defaultCode: `# 基本的な範囲
r = 1..10
IO.inspect(r)
IO.puts(Enum.count(r))

# リストに変換
IO.inspect(Enum.to_list(1..5))

# for との組み合わせ（最もよく使う）
for i <- 1..5 do
  IO.puts("i = \#{i}")
end

# Enum 関数との組み合わせ
IO.puts(Enum.sum(1..100))        # ガウスの公式：5050
IO.inspect(Enum.map(1..5, &(&1 * &1)))

# ステップ付き範囲（1.12以降）
IO.inspect(Enum.to_list(1..10//2))   # [1, 3, 5, 7, 9]
IO.inspect(Enum.to_list(0..20//5))   # [0, 5, 10, 15, 20]

# 降順
IO.inspect(Enum.to_list(10..1//-1))   # [10, 9, ..., 1]

# 範囲内かどうか確認
IO.puts(5 in 1..10)    # true
IO.puts(15 in 1..10)   # false

# パターンマッチ
case 7 do
  x when x in 1..5  -> IO.puts("小さい")
  x when x in 6..10 -> IO.puts("中くらい: \#{x}")
  _                  -> IO.puts("大きい")
end`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "nil と存在確認",
    description: `
<h2>nil と存在確認</h2>
<p><code>nil</code> は「値がない」ことを表すアトムです（<code>:nil</code> と同じ）。</p>
<h3>nil の扱い方</h3>
<ul>
  <li><code>nil</code> と <code>false</code> だけが falsy</li>
  <li><code>||</code> でデフォルト値を提供: <code>value || "default"</code></li>
  <li><code>is_nil/1</code> で確認</li>
  <li>マップの存在しないキーへのアクセスは <code>nil</code></li>
</ul>
<h3>nil との安全な操作</h3>
<p>Elixir には <code>nil</code> セーフなアクセサはありませんが、パターンマッチや <code>case</code>、<code>with</code> で安全に扱えます。</p>
`,
    defaultCode: `# nil の基本
IO.puts(nil == :nil)    # true
IO.puts(is_nil(nil))    # true
IO.puts(is_nil(false))  # false（false は nil ではない）

# nil は falsy
IO.puts(if(nil, do: "truthy", else: "falsy"))   # falsy
IO.puts(if(false, do: "truthy", else: "falsy")) # falsy
IO.puts(if(0, do: "truthy", else: "falsy"))     # truthy !

# || でデフォルト値
user_name = nil
IO.puts(user_name || "名無し")

config = %{timeout: nil, retries: 3}
IO.puts(config[:timeout] || 5000)   # nil → デフォルト値
IO.puts(config[:retries] || 1)      # 3 → そのまま使用

# && で nil を伝播させる
user = nil
result = user && user.name   # user が nil なら nil
IO.puts(is_nil(result))

# パターンマッチで安全に処理
handle = fn
  nil   -> "値なし"
  value -> "値あり: \#{value}"
end
IO.puts(handle.(nil))
IO.puts(handle.("hello"))

# Map.get のデフォルト値活用
data = %{a: 1}
IO.puts(Map.get(data, :b, "デフォルト"))
IO.puts(Map.get(data, :a, "デフォルト"))`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "型変換と型チェック",
    description: `
<h2>型変換と型チェック</h2>
<h3>型チェック関数</h3>
<p><code>is_integer/1</code>、<code>is_float/1</code>、<code>is_atom/1</code>、<code>is_binary/1</code>、<code>is_list/1</code>、<code>is_map/1</code>、<code>is_tuple/1</code>、<code>is_function/1</code>、<code>is_pid/1</code>、<code>is_nil/1</code></p>
<h3>型変換</h3>
<p>Elixir は暗黙の型変換を行いません。明示的に変換関数を使います。</p>
<ul>
  <li><code>to_string/1</code>, <code>String.to_integer/1</code>, <code>Integer.to_string/1</code></li>
  <li><code>String.to_atom/1</code>（注意：アトムテーブルを消費）</li>
  <li><code>Atom.to_string/1</code></li>
</ul>
`,
    defaultCode: `# 型チェック関数
IO.puts(is_integer(42))        # true
IO.puts(is_float(3.14))        # true
IO.puts(is_atom(:hello))       # true
IO.puts(is_binary("hello"))    # true（文字列はバイナリ）
IO.puts(is_list([1, 2]))       # true
IO.puts(is_map(%{a: 1}))       # true
IO.puts(is_tuple({1, 2}))      # true
IO.puts(is_function(&IO.puts/1)) # true
IO.puts(is_nil(nil))           # true
IO.puts(is_number(42))         # true（integer も float も）

# 型変換
IO.puts(Integer.to_string(42))  # "42"
IO.puts(Float.to_string(3.14))  # "3.14"
IO.puts(Atom.to_string(:hello)) # "hello"

IO.puts(String.to_integer("42"))   # 42
IO.puts(String.to_float("3.14"))   # 3.14
IO.puts(String.to_atom("hello"))   # :hello

# Integer.parse（安全な変換）
IO.inspect(Integer.parse("42"))      # {42, ""}
IO.inspect(Integer.parse("42abc"))   # {42, "abc"}
IO.inspect(Integer.parse("abc"))     # :error

# to_string/1 はプロトコル（String.Chars）
IO.puts(to_string(42))
IO.puts(to_string(:hello))
IO.puts(to_string(3.14))
IO.puts(to_string([1, 2, 3]))  # !`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "バイナリとビット列",
    description: `
<h2>バイナリとビット列</h2>
<p>バイナリは <code>&lt;&lt;...&gt;&gt;</code> で表現されるバイト列です。Elixir の文字列はバイナリの特殊ケースです。</p>
<h3>ビット列（Bitstring）</h3>
<p>任意のビット数を格納できる構造。バイナリはビット数が8の倍数のビット列です。</p>
<h3>バイナリパターンマッチ</h3>
<p>バイナリもパターンマッチで分解できます。ネットワークプロトコルの解析などに使います。</p>
`,
    defaultCode: `# バイナリリテラル
bin = <<1, 2, 3, 4>>
IO.inspect(bin)

# 文字列はバイナリ
str = "hello"
IO.puts(is_binary(str))         # true
IO.puts(byte_size(str))         # 5

# UTF-8 の文字列はバイト数 != 文字数になることがある
jp = "こんにちは"
IO.puts(byte_size(jp))          # 15 (UTF-8: 3バイト/文字)
IO.puts(String.length(jp))      # 5

# バイナリの連結
IO.inspect(<<1, 2>> <> <<3, 4>>)

# ビット幅の指定
IO.inspect(<<255::8>>)          # <<255>>（8ビット）
IO.inspect(<<1::1, 0::1, 1::1>>) # ビット列

# バイナリのパターンマッチ
<<r, g, b>> = <<255, 128, 0>>
IO.puts("R=\#{r}, G=\#{g}, B=\#{b}")

# 先頭nバイトを取る
<<first::binary-size(3), rest::binary>> = "Hello, World!"
IO.puts("first: \#{first}")
IO.puts("rest:  \#{rest}")

# 文字列 -> バイナリ
bytes = :binary.bin_to_list("ABC")
IO.inspect(bytes)               # [65, 66, 67]`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "おめでとうございます！（Ch.2）",
    description: `
<h2>Ch.2 完了！</h2>
<p>基本型と値の章を修了しました。ここで学んだことを振り返りましょう：</p>
<ul>
  <li>✅ <strong>変数と不変性</strong> — 再束縛・不変データ構造</li>
  <li>✅ <strong>整数と浮動小数点</strong> — 任意精度整数、算術演算</li>
  <li>✅ <strong>アトムとブーリアン</strong> — falsy は false と nil のみ</li>
  <li>✅ <strong>タプル</strong> — {:ok, value} パターン</li>
  <li>✅ <strong>リスト</strong> — 連結リスト、[head | tail] 分解</li>
  <li>✅ <strong>マップ</strong> — キーバリューストア、更新構文</li>
  <li>✅ <strong>キーワードリスト</strong> — オプション引数のイディオム</li>
  <li>✅ <strong>範囲</strong> — 1..10//2 ステップ付き</li>
  <li>✅ <strong>nil と存在確認</strong></li>
  <li>✅ <strong>型変換と型チェック</strong></li>
  <li>✅ <strong>バイナリとビット列</strong></li>
</ul>
<p>次は <strong>Ch.3: パターンマッチ</strong> へ進みましょう！</p>
`,
    defaultCode: `# Ch.2 の振り返り演習
# 以下を実装してみましょう

# 1. FizzBuzz（1〜20）
result = for i <- 1..20 do
  cond do
    rem(i, 15) == 0 -> "FizzBuzz"
    rem(i, 3) == 0  -> "Fizz"
    rem(i, 5) == 0  -> "Buzz"
    true            -> Integer.to_string(i)
  end
end
IO.inspect(result)

# 2. マップから名前リストを抽出
users = [
  %{name: "Alice", age: 30},
  %{name: "Bob",   age: 25},
  %{name: "Carol", age: 35},
]
names = Enum.map(users, & &1.name)
IO.inspect(names)

# 3. キーワードリストをマップに変換
opts = [host: "localhost", port: 4000, debug: true]
config = Map.new(opts)
IO.inspect(config)

# 4. 範囲から偶数の二乗和
sum = 1..10
  |> Enum.filter(&(rem(&1, 2) == 0))
  |> Enum.map(&(&1 * &1))
  |> Enum.sum()
IO.puts("偶数の二乗和: \#{sum}")`,
  },
  {
    chapter: "Ch.2: 基本型と値",
    title: "MapSet と集合演算",
    description: `
<h2>MapSet</h2>
<p><code>MapSet</code> は重複なしの集合型です。<code>MapSet.new/1</code> でリストから作成します。</p>
<ul>
  <li><code>MapSet.union/2</code> — 和集合</li>
  <li><code>MapSet.intersection/2</code> — 積集合</li>
  <li><code>MapSet.difference/2</code> — 差集合</li>
  <li><code>MapSet.member?/2</code> — メンバー確認（O(log n)）</li>
</ul>
`,
    defaultCode: `a = MapSet.new([1, 2, 3, 4])
b = MapSet.new([3, 4, 5, 6])

IO.inspect(MapSet.union(a, b))        # {1,2,3,4,5,6}
IO.inspect(MapSet.intersection(a, b)) # {3,4}
IO.inspect(MapSet.difference(a, b))   # {1,2}
IO.puts(MapSet.member?(a, 2))         # true
IO.puts(MapSet.subset?(MapSet.new([1,2]), a)) # true
IO.puts(MapSet.size(a))               # 4

# リストの重複除去
list = [1, 2, 3, 2, 1, 4, 3, 5]
unique = list |> MapSet.new() |> MapSet.to_list()
IO.inspect(Enum.sort(unique))

# Enum と組み合わせ（MapSet は Enumerable）
IO.puts(Enum.sum(a))
IO.inspect(Enum.filter(a, &(&1 > 2)))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "パターンマッチ",
    description: `
<h2>パターンマッチ</h2>
<p>Elixir の <code>=</code> は「マッチ演算子」です。代入ではなく、左辺と右辺のパターンを照合します。</p>
<ul>
  <li><strong>変数束縛</strong> - <code>x = 1</code></li>
  <li><strong>タプル分解</strong> - <code>{a, b} = {1, 2}</code></li>
  <li><strong>リスト分解</strong> - <code>[h | t] = [1, 2, 3]</code></li>
  <li><strong>マップ分解</strong> - <code>%{name: name} = user</code></li>
  <li><strong>ピン演算子 ^</strong> - 既存変数の値でマッチ（再束縛しない）</li>
  <li><strong>case</strong> - パターンで分岐</li>
  <li><strong>ガード</strong> - <code>when</code> で条件を追加</li>
</ul>
<p>マッチに失敗すると <code>MatchError</code> が発生します。</p>
`,
    defaultCode: `# 基本的なパターンマッチ
x = 42
IO.puts("x = \#{x}")

# タプルの分解
{status, message, code} = {:ok, "success", 200}
IO.puts("\#{status}: \#{message} (\#{code})")

# リストの分解
[first, second | rest] = [1, 2, 3, 4, 5]
IO.puts("first=\#{first}, second=\#{second}")
IO.inspect(rest, label: "rest")

# マップの分解（部分マッチ可）
user = %{name: "Alice", age: 30, city: "Tokyo"}
%{name: name, age: age} = user
IO.puts("名前: \#{name}, 年齢: \#{age}")

# ピン演算子 ^ （再束縛せずにマッチ）
x = 1
{^x, y} = {1, 2}    # x=1 であることを確認してyに2を束縛
IO.puts("y = \#{y}")

# case でパターンマッチ
result = {:error, "not found", 404}
case result do
  {:ok, data} -> IO.puts("成功: \#{data}")
  {:error, msg, 404} -> IO.puts("404エラー: \#{msg}")
  {:error, msg, _} -> IO.puts("エラー: \#{msg}")
end

# ガード（when）
classify = fn
  x when x > 0 -> "正"
  x when x < 0 -> "負"
  _ -> "ゼロ"
end
IO.puts(classify.(10))
IO.puts(classify.(-3))
IO.puts(classify.(0))

# 関数引数でのパターンマッチ（case と同等）
describe = fn
  [] -> "空リスト"
  [_] -> "要素1つ"
  [_, _ | _] -> "複数要素"
end
IO.puts(describe.([]))
IO.puts(describe.([:a]))
IO.puts(describe.([:a, :b, :c]))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "マッチ演算子",
    description: `
<h2>マッチ演算子 =</h2>
<p>Elixir の <code>=</code> は「代入」ではなく<strong>マッチ演算子</strong>です。左辺と右辺が「一致するか」を検査し、一致すれば変数を束縛します。</p>
<h3>マッチの規則</h3>
<ul>
  <li>変数は任意の値にマッチし、その値に束縛される</li>
  <li>リテラル（数値、アトム等）は同じ値のみにマッチ</li>
  <li>マッチ失敗は <code>MatchError</code> を発生させる</li>
</ul>
`,
    defaultCode: `# = はマッチ演算子
x = 42       # x に 42 を束縛
IO.puts(x)

# 右辺の値が左辺のパターンと一致することを確認
1 = 1        # OK（リテラル同士のマッチ）
# 2 = 1     # MatchError: no match of right hand side value 1

# タプルのマッチ
{a, b} = {10, 20}
IO.puts("\#{a}, \#{b}")

# ネストしたマッチ
{:ok, {x, y}} = {:ok, {1, 2}}
IO.puts("\#{x}, \#{y}")

# リストのマッチ
[1, two, three] = [1, 2, 3]
IO.puts("\#{two}, \#{three}")

# アンダースコアで不要な値を無視
{_, important, _} = {:a, "大事な値", :c}
IO.puts(important)

# マッチは式として値を返す（右辺の値）
result = (x = 5)
IO.puts("x=\#{x}, result=\#{result}")

# パターンマッチ失敗の例（コメントを外すとエラー）
# {:ok, val} = {:error, "not found"}`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "ピン演算子 ^",
    description: `
<h2>ピン演算子 ^</h2>
<p><code>^variable</code> を使うと、変数を<strong>再束縛せずに</strong>その現在の値でマッチします。</p>
<h3>なぜ必要か？</h3>
<p><code>x = 1</code> の後に <code>x = 2</code> と書くと <code>x</code> が再束縛されます。しかし <code>^x</code> と書くと「x の現在の値（1）でマッチせよ」という意味になります。</p>
`,
    defaultCode: `# ピン演算子の必要性
x = 1
IO.puts("x = \#{x}")

# 通常のマッチ（x が再束縛される）
x = 2
IO.puts("x = \#{x}")   # 2

# ピン演算子（再束縛しない）
x = 1
{^x, y} = {1, 2}   # x=1 でマッチ確認、y に 2 を束縛
IO.puts("x=\#{x}, y=\#{y}")

# ピンが失敗するケース
# {^x, y} = {99, 2}  # MatchError（99 != 1）

# case での活用
expected = :ok
result = {:ok, 42}
case result do
  {^expected, value} -> IO.puts("期待通り: \#{value}")
  {status, _}        -> IO.puts("予期しない: \#{status}")
end

# リストでのピン
a = 1
[^a, b, c] = [1, 2, 3]
IO.puts("\#{a}, \#{b}, \#{c}")

# マップでのピン
key = :name
%{^key => name_value} = %{name: "Alice", age: 30}
IO.puts("name = \#{name_value}")`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "ガード（when）",
    description: `
<h2>ガード（when）</h2>
<p>ガードはパターンマッチに条件を追加します。<code>when</code> キーワードの後に条件式を書きます。</p>
<h3>ガードで使える式</h3>
<ul>
  <li>型チェック: <code>is_integer/1</code>, <code>is_list/1</code> など</li>
  <li>比較: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>in</code></li>
  <li>算術: <code>+</code>, <code>-</code>, <code>*</code>, <code>div/2</code>, <code>rem/2</code>, <code>abs/1</code></li>
  <li>論理: <code>and</code>, <code>or</code>, <code>not</code></li>
</ul>
<p><strong>注意</strong>: ガード内で例外が起きても MatchError にはならず、そのガードが失敗するだけです。</p>
`,
    defaultCode: `# case でのガード
classify_number = fn n ->
  case n do
    x when x > 0  -> "正: \#{x}"
    x when x < 0  -> "負: \#{x}"
    0             -> "ゼロ"
  end
end
IO.puts(classify_number.(42))
IO.puts(classify_number.(-7))
IO.puts(classify_number.(0))

# 関数節でのガード
defmodule Guard do
  def describe(x) when is_integer(x) and x > 0, do: "正の整数: \#{x}"
  def describe(x) when is_integer(x) and x < 0, do: "負の整数: \#{x}"
  def describe(x) when is_integer(x),            do: "ゼロ"
  def describe(x) when is_float(x),              do: "浮動小数: \#{x}"
  def describe(x) when is_binary(x),             do: "文字列: \#{x}"
  def describe(x) when is_list(x),               do: "リスト, 長さ: \#{length(x)}"
  def describe(_),                               do: "その他"
end

IO.puts(Guard.describe(42))
IO.puts(Guard.describe(-5))
IO.puts(Guard.describe(0))
IO.puts(Guard.describe(3.14))
IO.puts(Guard.describe("hello"))
IO.puts(Guard.describe([1, 2, 3]))

# in ガード
day_type = fn day ->
  cond do
    day in [:saturday, :sunday] -> "週末"
    day in [:monday, :tuesday, :wednesday,
            :thursday, :friday]  -> "平日"
    true -> "不明"
  end
end
IO.puts(day_type.(:saturday))
IO.puts(day_type.(:monday))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "case 式",
    description: `
<h2>case 式</h2>
<p><code>case</code> は式の値を複数のパターンと照合します。ガードも使えます。</p>
<h3>特徴</h3>
<ul>
  <li>上から順にパターンを試し、最初にマッチした節を実行</li>
  <li><code>_</code> でデフォルト節を書ける（省略すると全パターン失敗時に <code>CaseClauseError</code>）</li>
  <li><code>case</code> は式なので値を返す</li>
</ul>
`,
    defaultCode: `# 基本的な case
http_status = 404
message = case http_status do
  200 -> "OK"
  201 -> "Created"
  400 -> "Bad Request"
  404 -> "Not Found"
  500 -> "Internal Server Error"
  code when code >= 500 -> "Server Error: \#{code}"
  code when code >= 400 -> "Client Error: \#{code}"
  _   -> "Unknown: \#{http_status}"
end
IO.puts(message)

# タプルパターンのマッチ
handle_result = fn result ->
  case result do
    {:ok, value}            -> "成功: \#{inspect(value)}"
    {:error, :not_found}    -> "見つかりません"
    {:error, :unauthorized} -> "認証エラー"
    {:error, reason}        -> "エラー: \#{reason}"
  end
end

IO.puts(handle_result.({:ok, 42}))
IO.puts(handle_result.({:error, :not_found}))
IO.puts(handle_result.({:error, :unauthorized}))
IO.puts(handle_result.({:error, "timeout"}))

# リストパターン
describe_list = fn list ->
  case list do
    []        -> "空"
    [_]       -> "1要素"
    [a, b]    -> "2要素: \#{a}, \#{b}"
    [h | _]   -> "先頭: \#{h}, 複数要素"
  end
end
IO.puts(describe_list.([]))
IO.puts(describe_list.([:a]))
IO.puts(describe_list.([:a, :b]))
IO.puts(describe_list.([:a, :b, :c]))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "リストのパターンマッチ",
    description: `
<h2>リストのパターンマッチ</h2>
<p>リストは <code>[head | tail]</code> パターンで再帰的に分解できます。これが Elixir での再帰処理の根幹です。</p>
<h3>よくあるパターン</h3>
<ul>
  <li><code>[]</code> — 空リスト</li>
  <li><code>[x]</code> — 要素が1つのリスト</li>
  <li><code>[h | t]</code> — 先頭と残り</li>
  <li><code>[a, b | rest]</code> — 最初の2要素と残り</li>
</ul>
`,
    defaultCode: `# リストの基本パターン
describe = fn
  []          -> "空リスト"
  [x]         -> "1要素: \#{x}"
  [a, b]      -> "2要素: \#{a}, \#{b}"
  [h | _]     -> "先頭: \#{h}"
end
IO.puts(describe.([]))
IO.puts(describe.([:only]))
IO.puts(describe.([:a, :b]))
IO.puts(describe.([:x, :y, :z]))

# 再帰でリストを処理（パターンマッチの核心）
defmodule MyList do
  def sum([]),      do: 0
  def sum([h | t]), do: h + sum(t)

  def max([x]),     do: x
  def max([h | t]), do: Kernel.max(h, max(t))

  def contains?([], _),    do: false
  def contains?([h | _], h), do: true
  def contains?([_ | t], x), do: contains?(t, x)

  def take(_, 0),      do: []
  def take([], _),     do: []
  def take([h | t], n), do: [h | take(t, n - 1)]
end

IO.puts(MyList.sum([1, 2, 3, 4, 5]))    # 15
IO.puts(MyList.max([3, 1, 4, 1, 5, 9])) # 9
IO.puts(MyList.contains?([1,2,3], 2))   # true
IO.puts(MyList.contains?([1,2,3], 5))   # false
IO.inspect(MyList.take([1,2,3,4,5], 3)) # [1,2,3]`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "マップのパターンマッチ",
    description: `
<h2>マップのパターンマッチ</h2>
<p>マップは<strong>部分マッチ</strong>が可能です。右辺のマップが左辺のキーをすべて含んでいればマッチします。</p>
<h3>特徴</h3>
<ul>
  <li>左辺のキーが右辺にあればマッチ（右辺に余分なキーがあってもOK）</li>
  <li>変数でキーを動的に指定することも可能</li>
  <li>構造体でも同じ記法が使える</li>
</ul>
`,
    defaultCode: `# マップの部分マッチ
user = %{name: "Alice", age: 30, city: "Tokyo", role: :admin}

# 必要なキーだけ取り出す（他は無視）
%{name: name, role: role} = user
IO.puts("\#{name} is \#{role}")

# case でのマップパターン
classify_user = fn user ->
  case user do
    %{role: :admin, name: name} -> "\#{name} は管理者"
    %{role: :guest}             -> "ゲストユーザー"
    %{name: name, age: age} when age >= 18 -> "\#{name} は成人"
    %{name: name}               -> "\#{name} は未成年"
  end
end

IO.puts(classify_user.(%{name: "Alice", role: :admin}))
IO.puts(classify_user.(%{role: :guest}))
IO.puts(classify_user.(%{name: "Bob", age: 25, role: :user}))
IO.puts(classify_user.(%{name: "Carol", age: 15, role: :user}))

# 変数キーによるマッチ
key = :name
%{^key => value} = %{name: "Dave", age: 20}
IO.puts(value)

# ネストしたマップのマッチ
data = %{user: %{profile: %{score: 95, level: :gold}}}
%{user: %{profile: %{score: score, level: level}}} = data
IO.puts("score=\#{score}, level=\#{level}")`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "バイナリのパターンマッチ",
    description: `
<h2>バイナリ（文字列）のパターンマッチ</h2>
<p>バイナリ（文字列）もパターンマッチで分解できます。<code>&lt;&lt;pattern&gt;&gt;</code> 記法を使います。</p>
<h3>文字列のパターンマッチ</h3>
<p>文字列は <code>&lt;&lt;...&gt;&gt;</code> がバイナリなので、<code>&lt;&lt;first::utf8, rest::binary&gt;&gt;</code> で最初の文字と残りを分解できます。</p>
`,
    defaultCode: `# 文字列の先頭マッチ（String.starts_with? の代わりに使えることも）
greet = fn
  "Hello, " <> name -> "英語: こんにちは \#{name}"
  "こんにちは、" <> name -> "日本語: Hello \#{name}"
  other -> "不明: \#{other}"
end
IO.puts(greet.("Hello, Alice"))
IO.puts(greet.("こんにちは、太郎"))
IO.puts(greet.("Bonjour"))

# バイナリパターン（バイト操作）
<<r, g, b, a>> = <<255, 128, 0, 255>>
IO.puts("R=\#{r} G=\#{g} B=\#{b} A=\#{a}")

# サイズ指定
<<version::8, length::16, data::binary>> = <<1, 0, 42, 104, 101, 108, 108, 111>>
IO.puts("version=\#{version}, length=\#{length}")
IO.puts("data=\#{data}")

# UTF-8 文字の分解
<<char::utf8, rest::binary>> = "Hello"
IO.puts("first char code: \#{char}")  # 72 = 'H'
IO.puts("rest: \#{rest}")

# case での文字列マッチ
parse_command = fn cmd ->
  case cmd do
    "GET " <> path    -> {:get, path}
    "POST " <> path   -> {:post, path}
    "DELETE " <> path -> {:delete, path}
    _                 -> {:unknown, cmd}
  end
end
IO.inspect(parse_command.("GET /users"))
IO.inspect(parse_command.("POST /login"))
IO.inspect(parse_command.("PATCH /item"))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "関数節のパターンマッチ",
    description: `
<h2>関数節のパターンマッチ</h2>
<p>名前付き関数でも無名関数でも、同名の関数を複数定義して引数パターンで選択できます。これを<strong>関数節（Function Clauses）</strong>と呼びます。</p>
<h3>評価順序</h3>
<p>上から順に照合され、最初にマッチした節が実行されます。より具体的なパターンを先に書く必要があります。</p>
`,
    defaultCode: `defmodule Shape do
  # 図形の面積計算（関数節でディスパッチ）
  def area({:circle, r}),              do: :math.pi() * r * r
  def area({:rect, w, h}),             do: w * h
  def area({:triangle, base, height}), do: base * height / 2
  def area({:square, side}),           do: side * side

  # 説明（ガード付き関数節）
  def describe(n) when n > 100,  do: "大きな数: \#{n}"
  def describe(n) when n > 10,   do: "中くらいの数: \#{n}"
  def describe(n) when n > 0,    do: "小さな正の数: \#{n}"
  def describe(0),                do: "ゼロ"
  def describe(n),                do: "負の数: \#{n}"
end

IO.puts(Shape.area({:circle, 5}))
IO.puts(Shape.area({:rect, 4, 3}))
IO.puts(Shape.area({:triangle, 6, 4}))
IO.puts(Shape.area({:square, 5}))

IO.puts(Shape.describe(200))
IO.puts(Shape.describe(50))
IO.puts(Shape.describe(3))
IO.puts(Shape.describe(0))
IO.puts(Shape.describe(-5))

# 無名関数の複数節
fizzbuzz = fn
  n when rem(n, 15) == 0 -> "FizzBuzz"
  n when rem(n, 3) == 0  -> "Fizz"
  n when rem(n, 5) == 0  -> "Buzz"
  n                       -> Integer.to_string(n)
end
IO.inspect(Enum.map(1..15, fizzbuzz))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "with 式（パターン連鎖）",
    description: `
<h2>with 式</h2>
<p><code>with</code> は複数のパターンマッチを順番に連鎖させます。すべてのパターンが成功したら <code>do</code> ブロックを実行し、どれかが失敗したら <code>else</code> 節にジャンプします。</p>
<h3>典型的な使い方</h3>
<p><code>{:ok, value} &lt;- some_operation()</code> のように <code>&lt;-</code> でパターンマッチします。</p>
`,
    defaultCode: `# with の基本構造
defmodule Registration do
  def process(params) do
    with {:ok, name}  <- validate_name(params[:name]),
         {:ok, age}   <- validate_age(params[:age]),
         {:ok, email} <- validate_email(params[:email]) do
      # すべて成功した場合
      {:ok, %{name: name, age: age, email: email}}
    else
      # どれかが失敗した場合
      {:error, field, msg} -> {:error, "#{field}: #{msg}"}
    end
  end

  defp validate_name(nil),  do: {:error, :name, "必須です"}
  defp validate_name(""),   do: {:error, :name, "空にできません"}
  defp validate_name(name), do: {:ok, String.trim(name)}

  defp validate_age(age) when is_integer(age) and age >= 0, do: {:ok, age}
  defp validate_age(_),  do: {:error, :age, "0以上の整数が必要です"}

  defp validate_email(email) when is_binary(email) do
    if String.contains?(email, "@"),
      do:   {:ok, email},
      else: {:error, :email, "@が必要です"}
  end
  defp validate_email(_), do: {:error, :email, "文字列が必要です"}
end

IO.inspect(Registration.process(%{name: "Alice", age: 25, email: "a@example.com"}))
IO.inspect(Registration.process(%{name: nil,     age: 25, email: "a@example.com"}))
IO.inspect(Registration.process(%{name: "Bob",   age: -1, email: "b@example.com"}))
IO.inspect(Registration.process(%{name: "Carol", age: 30, email: "invalid"}))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "演習：パターンマッチ",
    description: `
<h2>演習：パターンマッチ</h2>
<p>学んだパターンマッチの知識を使って実装してみましょう。</p>
<h3>課題</h3>
<ol>
  <li><code>head_tail/1</code> — リストを <code>{head, tail}</code> に分解する（空リストは <code>:empty</code>）</li>
  <li><code>classify/1</code> — 値を分類する（整数/文字列/アトム/リスト/その他）</li>
  <li><code>parse_response/1</code> — HTTP レスポンスタプルを解析する</li>
</ol>
`,
    defaultCode: `defmodule Exercise do
  # 課題1: リストを {head, tail} に分解
  def head_tail([]),      do: :empty
  def head_tail([h | t]), do: {h, t}

  # 課題2: 値を分類
  def classify(x) when is_integer(x) and x > 0, do: "正の整数"
  def classify(x) when is_integer(x) and x < 0, do: "負の整数"
  def classify(0),                               do: "ゼロ"
  def classify(x) when is_binary(x),             do: "文字列 (\#{String.length(x)}文字)"
  def classify(x) when is_atom(x),               do: "アトム :\#{x}"
  def classify(x) when is_list(x),               do: "リスト (\#{length(x)}要素)"
  def classify(_),                               do: "その他"

  # 課題3: HTTP レスポンス解析
  def parse_response({200, body}),            do: {:ok, body}
  def parse_response({201, body}),            do: {:created, body}
  def parse_response({404, _}),               do: {:not_found, nil}
  def parse_response({500, msg}),             do: {:server_error, msg}
  def parse_response({code, _}) when code >= 400, do: {:client_error, code}
  def parse_response({code, body}),           do: {:unknown, code, body}
end

# テスト
IO.inspect(Exercise.head_tail([]))
IO.inspect(Exercise.head_tail([1, 2, 3]))

IO.puts(Exercise.classify(42))
IO.puts(Exercise.classify(-7))
IO.puts(Exercise.classify(0))
IO.puts(Exercise.classify("hello"))
IO.puts(Exercise.classify(:ok))
IO.puts(Exercise.classify([1,2,3]))

IO.inspect(Exercise.parse_response({200, "OK"}))
IO.inspect(Exercise.parse_response({404, "Not Found"}))
IO.inspect(Exercise.parse_response({500, "Internal Error"}))`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "おめでとうございます！（Ch.3）",
    description: `
<h2>Ch.3 完了！</h2>
<p>パターンマッチの章を修了しました！</p>
<ul>
  <li>✅ <strong>マッチ演算子 =</strong> — 代入ではなくパターン照合</li>
  <li>✅ <strong>ピン演算子 ^</strong> — 再束縛なしでマッチ</li>
  <li>✅ <strong>ガード（when）</strong> — 条件付きパターン</li>
  <li>✅ <strong>case 式</strong> — 複数パターンの分岐</li>
  <li>✅ <strong>リストのパターンマッチ</strong> — [head | tail] 分解</li>
  <li>✅ <strong>マップのパターンマッチ</strong> — 部分マッチ</li>
  <li>✅ <strong>バイナリのパターンマッチ</strong> — 文字列分解</li>
  <li>✅ <strong>関数節</strong> — 引数パターンで関数を選択</li>
  <li>✅ <strong>with 式</strong> — パターンマッチの連鎖</li>
</ul>
<p>パターンマッチは Elixir の心臓部です。次の章以降でも随所に登場します。<br>
次は <strong>Ch.4: 関数とモジュール</strong> へ進みましょう！</p>
`,
    defaultCode: `# パターンマッチの総合演習
# JSON ライクなデータから情報を抽出する

data = %{
  status: :ok,
  users: [
    %{name: "Alice", role: :admin, score: 95},
    %{name: "Bob",   role: :user,  score: 72},
    %{name: "Carol", role: :user,  score: 88},
    %{name: "Dave",  role: :guest, score: nil},
  ]
}

# パターンマッチで status を確認して users を取り出す
with {:ok, users} <- (case data do
                        %{status: :ok, users: u} -> {:ok, u}
                        %{status: status}        -> {:error, status}
                      end) do
  # 管理者を抽出
  admins = for %{name: name, role: :admin} <- users, do: name
  IO.inspect(admins, label: "管理者")

  # スコアあり・スコアなしで分類
  {with_score, without_score} = Enum.split_with(users, &(&1.score != nil))
  IO.inspect(Enum.map(with_score, & &1.name),    label: "スコアあり")
  IO.inspect(Enum.map(without_score, & &1.name), label: "スコアなし")

  # 平均スコア
  avg = Enum.sum(Enum.map(with_score, & &1.score)) / length(with_score)
  IO.puts("平均スコア: \#{Float.round(avg, 1)}")
end`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "タプルのパターンマッチ",
    description: `
<h2>タプルのパターンマッチ</h2>
<p>タプルは固定長なので、サイズと各要素をパターンで照合できます。<code>{:ok, value}</code> / <code>{:error, reason}</code> パターンは Elixir 全体で使われる最重要イディオムです。</p>
`,
    defaultCode: `# 2要素タプル
{a, b} = {1, 2}
IO.puts("\#{a}, \#{b}")

# {:ok, value} / {:error, reason} パターン
def_result = fn x ->
  if x > 0, do: {:ok, x * 2}, else: {:error, "負の数: \#{x}"}
end

case def_result.(5) do
  {:ok, v}    -> IO.puts("成功: \#{v}")
  {:error, e} -> IO.puts("失敗: \#{e}")
end

case def_result.(-3) do
  {:ok, v}    -> IO.puts("成功: \#{v}")
  {:error, e} -> IO.puts("失敗: \#{e}")
end

# 3要素タプル
{status, code, msg} = {:error, 404, "Not Found"}
IO.puts("\#{status} \#{code}: \#{msg}")

# ネストしたタプル
{{x1, y1}, {x2, y2}} = {{0, 0}, {3, 4}}
dist = :math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
IO.puts("距離: \#{dist}")

# 特定要素のみマッチ（残りは_で無視）
{:ok, _, third} = {:ok, "ignored", 42}
IO.puts("third: \#{third}")`,
  },
  {
    chapter: "Ch.3: パターンマッチ",
    title: "構造体のパターンマッチ",
    description: `
<h2>構造体のパターンマッチ</h2>
<p>構造体もマップと同じ記法でパターンマッチできます。型チェックも同時に行われるため、マップよりも安全です。</p>
<pre><code>%StructName{field: value} = struct</code></pre>
`,
    defaultCode: `defmodule User do
  defstruct [:name, :role, age: 0]
end

defmodule Post do
  defstruct [:title, :author, :published]
end

alice = %User{name: "Alice", role: :admin, age: 30}
bob   = %User{name: "Bob",   role: :user,  age: 25}

# 構造体のパターンマッチ
%User{name: name, role: :admin} = alice
IO.puts("管理者: \#{name}")

# case での構造体マッチ
describe = fn
  %User{role: :admin, name: n} -> "\#{n} は管理者"
  %User{age: a, name: n} when a >= 18 -> "\#{n} は成人ユーザー"
  %User{name: n} -> "\#{n} は未成年ユーザー"
  %Post{title: t} -> "投稿: \#{t}"
end

IO.puts(describe.(alice))
IO.puts(describe.(bob))
IO.puts(describe.(%Post{title: "Hello"}))

# 構造体は %{} でもマッチ可（型チェックなし）
%{name: n} = alice
IO.puts(n)

# is_struct でガード
check = fn s ->
  cond do
    is_struct(s, User) -> "User 型"
    is_struct(s, Post) -> "Post 型"
    true               -> "その他"
  end
end
IO.puts(check.(alice))
IO.puts(check.(%Post{title: "X"}))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "関数",
    description: `
<h2>関数</h2>
<p>Elixir の関数には2種類あります：</p>
<ul>
  <li><strong>無名関数</strong> - <code>fn x -> x * 2 end</code>（呼び出し: <code>func.(arg)</code>）</li>
  <li><strong>名前付き関数</strong> - モジュール内で <code>def</code> で定義</li>
</ul>
<h3>キャプチャ演算子 &amp;</h3>
<p><code>&amp;Module.func/arity</code> で既存の名前付き関数を無名関数に変換。<br>
<code>&amp;(&amp;1 * 2)</code> で簡略記法の無名関数（<code>&amp;1</code> が第1引数）。</p>
<h3>パイプ演算子 |&gt;</h3>
<p>左の式の結果を右の関数の第1引数として渡します。データ変換チェーンを読みやすく書けます。</p>
<h3>クロージャ</h3>
<p>無名関数は外部スコープの変数をキャプチャします。</p>
`,
    defaultCode: `# 無名関数
double = fn x -> x * 2 end
IO.puts(double.(5))

# 複数節の無名関数（パターンマッチ）
describe = fn
  0             -> "ゼロ"
  x when x > 0 -> "正の数: \#{x}"
  x             -> "負の数: \#{x}"
end
IO.puts(describe.(0))
IO.puts(describe.(42))
IO.puts(describe.(-7))

# キャプチャ演算子 &
square = &(&1 * &1)
IO.puts(square.(5))

add = &(&1 + &2)
IO.puts(add.(3, 4))

# 既存関数のキャプチャ
upcase = &String.upcase/1
IO.puts(upcase.("hello"))

# パイプ演算子 |>
result =
  "  Hello, World!  "
  |> String.trim()
  |> String.downcase()
  |> String.replace(",", "")
  |> String.split(" ")
  |> Enum.map(&String.capitalize/1)
  |> Enum.join(" ")
IO.puts(result)

# Enum でのキャプチャ活用
[1, 2, 3, 4, 5]
|> Enum.map(&(&1 * &1))
|> Enum.filter(&(&1 > 5))
|> IO.inspect(label: "二乗して5超")

# クロージャ（外部変数をキャプチャ）
make_adder = fn n -> fn x -> x + n end end
add10 = make_adder.(10)
IO.puts(add10.(5))    # 15
IO.puts(add10.(20))   # 30

# 関数の引数としての関数
apply_twice = fn f, x -> f.(f.(x)) end
IO.puts(apply_twice.(double, 3))    # 12`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "モジュール",
    description: `
<h2>モジュール</h2>
<p><code>defmodule</code> でモジュールを定義します。</p>
<ul>
  <li><code>def</code> - 公開関数</li>
  <li><code>defp</code> - プライベート関数（モジュール外から呼び出し不可）</li>
  <li><code>@attribute</code> - モジュール属性（コンパイル時定数・メタデータ）</li>
  <li><code>@moduledoc</code> / <code>@doc</code> - ドキュメント</li>
</ul>
<h3>関数節（Function Clauses）</h3>
<p>同名の関数を複数定義して、パターンマッチで節を選択できます。ガード（<code>when</code>）も使えます。</p>
<h3>デフォルト引数</h3>
<p><code>def greet(name \\\\ "World")</code> で引数にデフォルト値を設定します。</p>
`,
    defaultCode: `defmodule Calculator do
  @moduledoc "基本的な計算を行うモジュール"

  # モジュール属性（コンパイル時定数）
  @pi 3.14159265358979

  @doc "2つの数を足します"
  def add(a, b), do: a + b

  @doc "2つの数を掛けます"
  def multiply(a, b), do: a * b

  @doc "円の面積を計算します"
  def circle_area(r), do: @pi * r * r

  # プライベート関数（外部から呼び出し不可）
  defp validate(x) when x < 0, do: {:error, "負の数は使えません"}
  defp validate(x), do: {:ok, x}

  def safe_sqrt(x) do
    case validate(x) do
      {:ok, n}    -> {:ok, :math.sqrt(n)}
      error       -> error
    end
  end
end

IO.puts(Calculator.add(3, 4))
IO.puts(Calculator.multiply(6, 7))
IO.puts(Calculator.circle_area(5))
IO.inspect(Calculator.safe_sqrt(16))
IO.inspect(Calculator.safe_sqrt(-1))

# 関数節（複数節）のモジュール
defmodule Greeter do
  def greet(:en, name), do: "Hello, \#{name}!"
  def greet(:ja, name), do: "こんにちは、\#{name}！"
  def greet(:es, name), do: "¡Hola, \#{name}!"
  def greet(_, name),   do: "Hi, \#{name}!"
end

IO.puts(Greeter.greet(:en, "Alice"))
IO.puts(Greeter.greet(:ja, "太郎"))
IO.puts(Greeter.greet(:es, "Carlos"))
IO.puts(Greeter.greet(:fr, "Marie"))

# デフォルト引数
defmodule Padder do
  def pad(str, width \\\\ 10, char \\\\ " ") do
    String.pad_leading(str, width, char)
  end
end

IO.puts(Padder.pad("hello"))
IO.puts(Padder.pad("hello", 15))
IO.puts(Padder.pad("42", 8, "0"))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "再帰",
    description: `
<h2>再帰</h2>
<p>Elixir は純粋な関数型言語のため、ループの代わりに再帰を使います。<code>Enum</code> モジュールが多くの場合に代替になります。</p>
<h3>末尾再帰（Tail Recursion）</h3>
<p>再帰呼び出しが関数の最後の操作の場合、Elixir はスタックを消費しません（末尾呼び出し最適化: TCO）。</p>
<h3>アキュムレータパターン</h3>
<p>末尾再帰を実現するため、結果を蓄積する引数（アキュムレータ）を使います。</p>
<pre><code>def sum(list, acc \\\\ 0)
def sum([], acc), do: acc
def sum([h | t], acc), do: sum(t, acc + h)</code></pre>
`,
    defaultCode: `defmodule Recursive do
  # 階乗（非末尾再帰）
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)

  # 階乗（末尾再帰 + アキュムレータ）
  def factorial_tail(n, acc \\\\ 1)
  def factorial_tail(0, acc), do: acc
  def factorial_tail(n, acc), do: factorial_tail(n - 1, n * acc)

  # フィボナッチ数列（末尾再帰）
  def fib(n), do: fib(n, 0, 1)
  defp fib(0, a, _), do: a
  defp fib(n, a, b), do: fib(n - 1, b, a + b)

  # リストの合計（末尾再帰）
  def sum(list, acc \\\\ 0)
  def sum([], acc), do: acc
  def sum([h | t], acc), do: sum(t, acc + h)

  # リストを逆にする
  def reverse(list, acc \\\\ [])
  def reverse([], acc), do: acc
  def reverse([h | t], acc), do: reverse(t, [h | acc])

  # マイリスト map 実装
  def my_map([], _f), do: []
  def my_map([h | t], f), do: [f.(h) | my_map(t, f)]

  # フラット化
  def flatten([]), do: []
  def flatten([h | t]) when is_list(h), do: flatten(h) ++ flatten(t)
  def flatten([h | t]), do: [h | flatten(t)]

  # zip
  def zip([], _), do: []
  def zip(_, []), do: []
  def zip([h1 | t1], [h2 | t2]), do: [{h1, h2} | zip(t1, t2)]
end

IO.puts(Recursive.factorial(10))
IO.puts(Recursive.factorial_tail(10))
IO.puts(Recursive.fib(10))          # 55
IO.puts(Recursive.sum([1, 2, 3, 4, 5]))
IO.inspect(Recursive.reverse([1, 2, 3, 4, 5]))
IO.inspect(Recursive.my_map([1, 2, 3], &(&1 * 2)))
IO.inspect(Recursive.flatten([1, [2, 3], [4, [5, 6]]]))
IO.inspect(Recursive.zip([:a, :b, :c], [1, 2, 3]))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "無名関数",
    description: `
<h2>無名関数</h2>
<p>無名関数は <code>fn 引数 -> 本体 end</code> で定義します。呼び出しには <code>.()</code> が必要です。</p>
<h3>複数節の無名関数</h3>
<p>無名関数でも複数の節（節ごとに異なるパターン）を書けます。</p>
<h3>クロージャ</h3>
<p>無名関数は定義時のスコープの変数をキャプチャします（クロージャ）。</p>
`,
    defaultCode: `# 基本的な無名関数
double = fn x -> x * 2 end
IO.puts(double.(5))   # .(引数) で呼び出す

# 複数引数
add = fn x, y -> x + y end
IO.puts(add.(3, 4))

# 1行での省略形（do は省略可）
square = fn x -> x * x end

# 複数節の無名関数（パターンマッチ）
describe = fn
  0             -> "ゼロ"
  x when x > 0 -> "正: \#{x}"
  x             -> "負: \#{x}"
end
IO.puts(describe.(0))
IO.puts(describe.(5))
IO.puts(describe.(-3))

# クロージャ（外部変数をキャプチャ）
base = 10
add_base = fn x -> x + base end
IO.puts(add_base.(5))   # 15

# 再代入しても元の値を保持
base = 999
IO.puts(add_base.(5))   # まだ 15（クロージャは元の値を保持）

# カリー化（関数を返す関数）
make_multiplier = fn n -> fn x -> x * n end end
triple = make_multiplier.(3)
IO.puts(triple.(7))   # 21

# 関数を引数として渡す
apply = fn f, x -> f.(x) end
IO.puts(apply.(double, 5))   # 10`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "キャプチャ演算子 &",
    description: `
<h2>キャプチャ演算子 &amp;</h2>
<p><code>&amp;</code> は関数を第一級オブジェクトとして扱うための演算子です。</p>
<h3>2つの使い方</h3>
<ol>
  <li><code>&amp;Module.function/arity</code> — 既存の名前付き関数を無名関数として取得</li>
  <li><code>&amp;(式)</code> — 簡略記法の無名関数（<code>&amp;1</code> が第1引数、<code>&amp;2</code> が第2引数）</li>
</ol>
`,
    defaultCode: `# 既存関数のキャプチャ
upcase = &String.upcase/1
IO.puts(upcase.("hello"))

to_int = &String.to_integer/1
IO.puts(to_int.("42"))

# Enum との組み合わせ（最もよく使うパターン）
words = ["hello", "world", "elixir"]
IO.inspect(Enum.map(words, &String.upcase/1))
IO.inspect(Enum.map(words, &String.length/1))
IO.inspect(Enum.filter(words, &String.starts_with?(&1, "e")))

# 簡略記法 &(式)
double   = &(&1 * 2)
add      = &(&1 + &2)
square   = &(&1 * &1)

IO.puts(double.(5))
IO.puts(add.(3, 4))
IO.puts(square.(7))

# Enum.map で簡略記法
IO.inspect(Enum.map(1..5, &(&1 * &1)))
IO.inspect(Enum.map(1..5, &(Integer.to_string(&1))))

# 自作関数のキャプチャ
defmodule Math do
  def double(x), do: x * 2
  def add(x, y), do: x + y
end

IO.inspect(Enum.map(1..5, &Math.double/1))
IO.inspect(Enum.reduce(1..5, 0, &Math.add/2))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "パイプ演算子 |>",
    description: `
<h2>パイプ演算子 |&gt;</h2>
<p><code>|&gt;</code> は左辺の値を右辺の関数の<strong>第1引数</strong>として渡します。データの変換チェーンを自然な順序で書けます。</p>
<h3>読み方</h3>
<p>「〜を〜に通す」という感覚で読みます。<code>data |&gt; transform |&gt; format</code></p>
`,
    defaultCode: `# パイプなし（ネストが深くなる）
result1 = Enum.join(
  Enum.map(
    Enum.filter(1..10, fn x -> rem(x, 2) == 0 end),
    fn x -> x * x end
  ),
  ", "
)
IO.puts(result1)

# パイプあり（左から右に読める）
result2 =
  1..10
  |> Enum.filter(&(rem(&1, 2) == 0))
  |> Enum.map(&(&1 * &1))
  |> Enum.join(", ")
IO.puts(result2)

# 文字列処理のパイプライン
"  Hello, World!  "
|> String.trim()
|> String.downcase()
|> String.replace(",", "")
|> String.split()
|> Enum.map(&String.capitalize/1)
|> Enum.join(" ")
|> IO.puts()

# 第1引数以外に渡したい場合は無名関数で包む
[3, 1, 4, 1, 5, 9, 2, 6]
|> Enum.sort()
|> Enum.uniq()
|> then(fn list -> "ソート済みユニーク: \#{inspect(list)}" end)
|> IO.puts()

# tap/1 でデバッグ（値を変えずにサイドエフェクト）
1..5
|> Enum.map(&(&1 * 2))
|> tap(&IO.inspect(&1, label: "2倍"))
|> Enum.sum()
|> IO.puts()`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "デフォルト引数とプライベート関数",
    description: `
<h2>デフォルト引数とプライベート関数</h2>
<h3>デフォルト引数</h3>
<p><code>def func(arg \\\\ default)</code> でデフォルト値を設定します。<br>
複数節がある場合は、ヘッダー宣言（本体なし）でデフォルトを指定します。</p>
<h3>プライベート関数</h3>
<p><code>defp</code> で定義した関数はモジュール外から呼び出せません。内部実装を隠蔽します。</p>
`,
    defaultCode: `defmodule Server do
  # デフォルト引数
  def connect(host, port \\\\ 80, timeout \\\\ 5000) do
    IO.puts("接続: \#{host}:\#{port} (timeout=\#{timeout}ms)")
  end

  # 複数節でデフォルト引数（ヘッダー宣言が必要）
  def greet(name, lang \\\\ :ja)
  def greet(name, :ja), do: "こんにちは、\#{name}！"
  def greet(name, :en), do: "Hello, \#{name}!"
  def greet(name, _),   do: "Hi, \#{name}!"

  # プライベート関数（外部から呼び出し不可）
  def safe_divide(a, b) do
    case validate_divisor(b) do
      :ok    -> {:ok, a / b}
      :error -> {:error, "ゼロ除算"}
    end
  end

  defp validate_divisor(0), do: :error
  defp validate_divisor(_), do: :ok
end

Server.connect("localhost")              # デフォルト: 80, 5000
Server.connect("example.com", 443)      # timeout はデフォルト
Server.connect("db.local", 5432, 10000) # すべて指定

IO.puts(Server.greet("Alice"))
IO.puts(Server.greet("Bob", :en))

IO.inspect(Server.safe_divide(10, 3))
IO.inspect(Server.safe_divide(10, 0))

# Server.validate_divisor(0)  # UndefinedFunctionError（プライベート）`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "モジュール属性",
    description: `
<h2>モジュール属性</h2>
<p><code>@attribute</code> でモジュールレベルの定数やメタデータを定義します。</p>
<h3>主な使い方</h3>
<ul>
  <li><code>@moduledoc</code> — モジュールのドキュメント</li>
  <li><code>@doc</code> — 関数のドキュメント</li>
  <li><code>@spec</code> — 型シグネチャ</li>
  <li><code>@constant 値</code> — コンパイル時定数</li>
  <li><code>@behaviour</code> — ビヘイビアの宣言</li>
</ul>
<p>モジュール属性はコンパイル時に評価されます。実行時のオーバーヘッドはありません。</p>
`,
    defaultCode: `defmodule Config do
  @moduledoc """
  アプリケーション設定モジュール。
  モジュール属性を定数として使う例。
  """

  # コンパイル時定数
  @version "1.0.0"
  @max_retries 3
  @timeout_ms 5_000
  @supported_langs [:ja, :en, :zh]
  @base_url "https://api.example.com"

  @doc "バージョン文字列を返します"
  def version, do: @version

  @doc "API のベース URL を返します"
  def base_url, do: @base_url

  @doc "設定のサマリーを返します"
  def summary do
    %{
      version: @version,
      max_retries: @max_retries,
      timeout_ms: @timeout_ms,
      langs: @supported_langs,
    }
  end

  def valid_lang?(lang), do: lang in @supported_langs

  # 属性で繰り返しを避ける
  @days_of_week [:mon, :tue, :wed, :thu, :fri, :sat, :sun]
  @weekend [:sat, :sun]

  def weekday?(day), do: day in @days_of_week and day not in @weekend
  def weekend?(day), do: day in @weekend
end

IO.puts(Config.version())
IO.puts(Config.base_url())
IO.inspect(Config.summary())
IO.puts(Config.valid_lang?(:ja))
IO.puts(Config.valid_lang?(:fr))
IO.puts(Config.weekday?(:mon))
IO.puts(Config.weekend?(:sat))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "alias / import / use / require",
    description: `
<h2>alias / import / use / require</h2>
<h3>alias</h3>
<p>モジュール名を短い別名で参照できます。<code>alias MyApp.Utils</code> → <code>Utils</code></p>
<h3>import</h3>
<p>モジュールの関数をモジュール名なしで呼べます。</p>
<h3>use</h3>
<p>モジュールの <code>__using__/1</code> マクロを呼び出し、定型コードを注入します。</p>
<h3>require</h3>
<p>マクロを使う前にモジュールをコンパイルします（マクロは require が必要）。</p>
`,
    defaultCode: `# alias — モジュール名を短縮
defmodule MyApp.StringUtils do
  def shorten(str, max \\\\ 20) do
    if String.length(str) > max,
      do: String.slice(str, 0, max) <> "...",
      else: str
  end
end

defmodule Demo do
  alias MyApp.StringUtils, as: SU
  # alias MyApp.StringUtils  # as: は省略可（最後のセグメント名になる）

  def run do
    IO.puts(SU.shorten("これは長い文字列です。省略されます。", 10))
    IO.puts(SU.shorten("短い"))
  end
end
Demo.run()

# import — 関数名だけで呼び出す
import Enum, only: [map: 2, filter: 2]
IO.inspect(map(1..5, &(&1 * 2)))
IO.inspect(filter(1..10, &(rem(&1, 2) == 0)))

# require — マクロを使う前に必要
require Logger  # Elixir 標準の Logger マクロ
# Logger.info("ログメッセージ")  # require なしではエラー

# Integer.is_odd は is_odd(x) のマクロ
require Integer
IO.puts(Integer.is_odd(3))
IO.puts(Integer.is_even(4))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "高階関数",
    description: `
<h2>高階関数</h2>
<p>高階関数は関数を引数として受け取ったり、関数を返したりする関数です。Elixir では関数が第一級オブジェクトです。</p>
<h3>よく使うパターン</h3>
<ul>
  <li><strong>Strategy パターン</strong> — 処理アルゴリズムを引数で注入</li>
  <li><strong>関数の合成</strong> — 小さな関数を組み合わせる</li>
  <li><strong>メモ化</strong> — 計算結果をキャッシュ</li>
</ul>
`,
    defaultCode: `# 高階関数の基本
defmodule HighOrder do
  # 関数を引数に取る
  def apply_twice(f, x), do: f.(f.(x))

  # 関数を返す
  def make_adder(n), do: fn x -> x + n end

  def make_validator(min, max) do
    fn x -> x >= min and x <= max end
  end

  # Strategy パターン（処理を引数で切り替え）
  def process(list, transform, filter) do
    list
    |> Enum.map(transform)
    |> Enum.filter(filter)
  end

  # 関数の合成
  def compose(f, g), do: fn x -> f.(g.(x)) end
end

double = fn x -> x * 2 end
IO.puts(HighOrder.apply_twice(double, 3))   # 12

add10 = HighOrder.make_adder(10)
IO.puts(add10.(5))    # 15
IO.puts(add10.(20))   # 30

valid_score? = HighOrder.make_validator(0, 100)
IO.puts(valid_score?.(85))    # true
IO.puts(valid_score?.(105))   # false

result = HighOrder.process(
  1..10,
  &(&1 * &1),         # 二乗する
  &(&1 > 25)          # 25より大きいものだけ
)
IO.inspect(result)

# 関数の合成
upcase_trim = HighOrder.compose(&String.upcase/1, &String.trim/1)
IO.puts(upcase_trim.("  hello world  "))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "末尾再帰とアキュムレータ",
    description: `
<h2>末尾再帰とアキュムレータパターン</h2>
<p>再帰呼び出しが関数の<strong>最後の操作</strong>であれば、Elixir はスタックフレームを使い回します（末尾呼び出し最適化: TCO）。</p>
<h3>アキュムレータパターン</h3>
<p>結果を蓄積する引数（アキュムレータ）を追加して末尾再帰にします。</p>
<pre><code>def sum([]),      do: 0         # 非末尾（スタック蓄積）
def sum([h | t]), do: h + sum(t)

def sum(list, acc \\ 0)         # 末尾（スタック不要）
def sum([], acc),    do: acc
def sum([h|t], acc), do: sum(t, h + acc)</code></pre>
`,
    defaultCode: `defmodule TailRec do
  # 非末尾再帰（大きなリストでスタックオーバーフローの危険）
  def sum_naive([]),      do: 0
  def sum_naive([h | t]), do: h + sum_naive(t)

  # 末尾再帰 + アキュムレータ
  def sum(list, acc \\\\ 0)
  def sum([], acc),      do: acc
  def sum([h | t], acc), do: sum(t, acc + h)

  # リストを逆順に（アキュムレータが自然に逆順を作る）
  def reverse(list, acc \\\\ [])
  def reverse([], acc),      do: acc
  def reverse([h | t], acc), do: reverse(t, [h | acc])

  # map の末尾再帰版
  def map(list, f, acc \\\\ [])
  def map([], _, acc),       do: reverse(acc)
  def map([h | t], f, acc),  do: map(t, f, [f.(h) | acc])

  # zip
  def zip(l1, l2, acc \\\\ [])
  def zip([], _, acc),              do: reverse(acc)
  def zip(_, [], acc),              do: reverse(acc)
  def zip([h1|t1], [h2|t2], acc),   do: zip(t1, t2, [{h1,h2}|acc])
end

IO.puts(TailRec.sum([1, 2, 3, 4, 5]))     # 15
IO.inspect(TailRec.reverse([1, 2, 3, 4])) # [4, 3, 2, 1]
IO.inspect(TailRec.map([1,2,3,4,5], &(&1*&1)))
IO.inspect(TailRec.zip([:a,:b,:c], [1,2,3]))

# 巨大なリストでも問題なし（末尾再帰）
big = Enum.to_list(1..100_000)
IO.puts(TailRec.sum(big))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "おめでとうございます！（Ch.4）",
    description: `
<h2>Ch.4 完了！</h2>
<p>関数とモジュールの章を修了しました！</p>
<ul>
  <li>✅ <strong>無名関数</strong> — fn/end、複数節、クロージャ</li>
  <li>✅ <strong>キャプチャ演算子 &amp;</strong> — &amp;Mod.func/arity、&amp;(&amp;1 * 2)</li>
  <li>✅ <strong>パイプ演算子 |&gt;</strong> — データ変換チェーン</li>
  <li>✅ <strong>名前付き関数</strong> — def、関数節、ガード</li>
  <li>✅ <strong>デフォルト引数</strong> — arg \\\\ default</li>
  <li>✅ <strong>プライベート関数</strong> — defp</li>
  <li>✅ <strong>モジュール属性</strong> — @定数、@doc</li>
  <li>✅ <strong>alias / import / use / require</strong></li>
  <li>✅ <strong>高階関数</strong> — Strategy パターン、関数合成</li>
  <li>✅ <strong>末尾再帰</strong> — アキュムレータパターン</li>
</ul>
<p>次は <strong>Ch.5: 制御フロー</strong> へ進みましょう！</p>
`,
    defaultCode: `# Ch.4 総合演習：パイプラインで文章を処理する

defmodule TextProcessor do
  @stop_words ~w(the a an is are was were)

  def process(text, opts \\\\ []) do
    max_words = Keyword.get(opts, :max_words, 10)
    upcase    = Keyword.get(opts, :upcase, false)

    text
    |> normalize()
    |> tokenize()
    |> remove_stop_words()
    |> Enum.take(max_words)
    |> maybe_upcase(upcase)
    |> Enum.join(" ")
  end

  defp normalize(text),   do: text |> String.trim() |> String.downcase()
  defp tokenize(text),    do: String.split(text, ~r/\s+/)
  defp remove_stop_words(words), do: Enum.reject(words, &(&1 in @stop_words))
  defp maybe_upcase(words, true),  do: Enum.map(words, &String.upcase/1)
  defp maybe_upcase(words, false), do: words
end

text = "  The quick brown fox is jumping over a lazy dog  "
IO.puts(TextProcessor.process(text))
IO.puts(TextProcessor.process(text, max_words: 5))
IO.puts(TextProcessor.process(text, upcase: true))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "Enum.reduce で自作コレクション関数",
    description: `
<h2>Enum.reduce で自作コレクション関数</h2>
<p><code>Enum.reduce/3</code> はコレクションの基本操作です。<code>map</code>・<code>filter</code>・<code>count</code> など、ほぼすべての Enum 関数を reduce で実装できます。</p>
`,
    defaultCode: `defmodule MyEnum do
  # map を reduce で実装
  def map(list, f) do
    list
    |> Enum.reduce([], fn x, acc -> [f.(x) | acc] end)
    |> Enum.reverse()
  end

  # filter を reduce で実装
  def filter(list, pred) do
    list
    |> Enum.reduce([], fn x, acc ->
      if pred.(x), do: [x | acc], else: acc
    end)
    |> Enum.reverse()
  end

  # count_by
  def count_by(list, pred) do
    Enum.reduce(list, 0, fn x, n -> if pred.(x), do: n+1, else: n end)
  end

  # group_by（reduce による実装）
  def group_by(list, key_fn) do
    Enum.reduce(list, %{}, fn x, acc ->
      k = key_fn.(x)
      Map.update(acc, k, [x], &(&1 ++ [x]))
    end)
  end
end

IO.inspect(MyEnum.map([1,2,3,4,5], &(&1 * 2)))
IO.inspect(MyEnum.filter([1,2,3,4,5], &(rem(&1,2)==0)))
IO.puts(MyEnum.count_by([1,2,3,4,5,6], &(rem(&1,2)==0)))
IO.inspect(MyEnum.group_by(["apple","ant","bee","cat","bear"], &String.first/1))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "モジュールのネストと __MODULE__",
    description: `
<h2>モジュールのネストと __MODULE__</h2>
<p>モジュールはネストして定義できます。<code>__MODULE__</code> は現在のモジュール名を返すマクロで、リファクタリング時の名前変更漏れを防ぎます。</p>
`,
    defaultCode: `defmodule MyApp do
  @app_name "MyApp"

  def name, do: @app_name

  defmodule User do
    defstruct [:id, :name, :email]

    def new(id, name, email) do
      %__MODULE__{id: id, name: name, email: email}
    end

    def greet(%__MODULE__{name: name}), do: "Hello, \#{name}!"
  end

  defmodule Repo do
    @store_name :"#{__MODULE__}.Store"

    def start do
      Agent.start_link(fn -> [] end, name: @store_name)
    end

    def insert(record) do
      Agent.update(@store_name, &[record | &1])
    end

    def all do
      Agent.get(@store_name, & &1)
    end
  end
end

# 使用
IO.puts(MyApp.name())

user = MyApp.User.new(1, "Alice", "alice@example.com")
IO.inspect(user)
IO.puts(MyApp.User.greet(user))

MyApp.Repo.start()
MyApp.Repo.insert(%{id: 1, name: "Alice"})
MyApp.Repo.insert(%{id: 2, name: "Bob"})
IO.inspect(MyApp.Repo.all())`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "then / tap / 関数合成",
    description: `
<h2>then / tap / 関数合成</h2>
<h3>then/2</h3>
<p><code>value |&gt; then(fn x -> ... end)</code> でパイプラインの中で任意の変換を挟めます。第1引数以外に渡したい場合などに使います。</p>
<h3>tap/2</h3>
<p><code>value |&gt; tap(fn x -> side_effect end)</code> で値を変えずにデバッグ出力などを挟みます。</p>
`,
    defaultCode: `# then（パイプラインの中で自由な変換）
result =
  [1, 2, 3, 4, 5]
  |> Enum.sum()
  |> then(fn n -> "合計: \#{n}" end)
  |> String.upcase()
IO.puts(result)

# 第1引数以外への渡し方
"hello"
|> then(&String.pad_leading(&1, 10))
|> IO.puts()

# tap（デバッグ用）
1..10
|> Enum.map(&(&1 * 2))
|> tap(&IO.inspect(&1, label: "map後"))
|> Enum.filter(&(&1 > 10))
|> tap(&IO.inspect(&1, label: "filter後"))
|> Enum.sum()
|> IO.puts()

# 関数合成
defmodule Compose do
  def compose(f, g), do: fn x -> f.(g.(x)) end
  def pipe(fns), do: Enum.reduce(fns, fn f, acc -> compose(f, acc) end)
end

trim_and_upcase = Compose.compose(&String.upcase/1, &String.trim/1)
IO.puts(trim_and_upcase.("  hello  "))

pipeline = Compose.pipe([
  &String.upcase/1,
  &String.reverse/1,
  &String.trim/1,
])
IO.puts(pipeline.("  hello  "))`,
  },
  {
    chapter: "Ch.4: 関数とモジュール",
    title: "再帰パターン集",
    description: `
<h2>再帰パターン集</h2>
<p>Elixir でよく使う再帰パターンをまとめます。実際のコードでは <code>Enum</code> を使うことが多いですが、再帰の理解は重要です。</p>
`,
    defaultCode: `defmodule Patterns do
  # 1. 蓄積パターン（末尾再帰）
  def sum([], acc \\\\ 0)
  def sum([h|t], acc), do: sum(t, acc + h)

  # 2. 変換パターン（map）
  def double([]),      do: []
  def double([h|t]),   do: [h*2 | double(t)]

  # 3. フィルタパターン
  def evens([]),       do: []
  def evens([h|t]) when rem(h,2)==0, do: [h | evens(t)]
  def evens([_|t]),   do: evens(t)

  # 4. 探索パターン
  def find([], _),     do: nil
  def find([h|_], h),  do: h
  def find([_|t], x),  do: find(t, x)

  # 5. 分割パターン
  def split_at(list, n, acc \\\\ [])
  def split_at(rest, 0, acc),    do: {Enum.reverse(acc), rest}
  def split_at([], _, acc),      do: {Enum.reverse(acc), []}
  def split_at([h|t], n, acc),   do: split_at(t, n-1, [h|acc])

  # 6. ツリー走査
  def tree_sum({val, left, right}), do: val + tree_sum(left) + tree_sum(right)
  def tree_sum(nil), do: 0
end

IO.puts(Patterns.sum([1,2,3,4,5]))
IO.inspect(Patterns.double([1,2,3,4,5]))
IO.inspect(Patterns.evens([1,2,3,4,5,6]))
IO.inspect(Patterns.find([1,2,3,4], 3))
IO.inspect(Patterns.split_at([1,2,3,4,5], 3))

# ツリー: 1 + (2 + 4 + 5) + 3 = 15
tree = {1, {2, {4,nil,nil}, {5,nil,nil}}, {3,nil,nil}}
IO.puts(Patterns.tree_sum(tree))`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "制御フロー",
    description: `
<h2>制御フロー</h2>
<h3>if / unless</h3>
<p>Elixir では <code>if</code> は式です（値を返します）。<code>false</code> と <code>nil</code> だけが偽です。</p>
<h3>case</h3>
<p>パターンマッチで複数のケースを処理します。ガード（<code>when</code>）を付けることもできます。</p>
<h3>cond</h3>
<p>最初に真になる条件の節を実行します。<code>if/else if</code> の代替です。</p>
<h3>with</h3>
<p>複数のパターンマッチを連鎖させます。失敗した場合は <code>else</code> 節で処理します。</p>
`,
    defaultCode: `# if / unless（式として値を返す）
x = 10
result = if x > 5 do
  "大きい"
else
  "小さい"
end
IO.puts(result)

unless x == 0 do
  IO.puts("ゼロではありません")
end

# false と nil だけが偽（0, "" はtruthyに注意！）
IO.puts(if(0,   do: "truthy", else: "falsy"))    # 0 は truthy
IO.puts(if(nil, do: "truthy", else: "falsy"))    # nil は falsy
IO.puts(if("",  do: "truthy", else: "falsy"))    # "" は truthy

# case
http_code = 404
case http_code do
  200 -> IO.puts("OK")
  201 -> IO.puts("Created")
  404 -> IO.puts("Not Found")
  500 -> IO.puts("Server Error")
  code when code >= 400 -> IO.puts("Client Error: \#{code}")
  _ -> IO.puts("Unknown: \#{http_code}")
end

# cond（複数条件の分岐）
score = 75
grade = cond do
  score >= 90 -> "A"
  score >= 80 -> "B"
  score >= 70 -> "C"
  score >= 60 -> "D"
  true        -> "F"  # デフォルト（必須）
end
IO.puts("成績: \#{grade}")

# with（複数のマッチを連鎖、失敗時はelse）
parse_and_double = fn str ->
  with {:ok, n} <- (case Integer.parse(str) do
                      {n, ""} -> {:ok, n}
                      _ -> {:error, "数値ではありません"}
                    end),
       true <- n > 0 || {:error, "正の数が必要です"} do
    {:ok, n * 2}
  else
    {:error, msg} -> {:error, msg}
    false -> {:error, "正の数が必要です"}
  end
end
IO.inspect(parse_and_double.("21"))
IO.inspect(parse_and_double.("abc"))
IO.inspect(parse_and_double.("-5"))`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "with とエラー処理",
    description: `
<h2>with とエラー処理</h2>
<h3>with 式</h3>
<p>複数のパターンマッチを連鎖させます。どれかが失敗すると <code>else</code> 節に移ります。<code>{:ok, _}/{:error, _}</code> パターンと組み合わせて使うのが定石です。</p>
<h3>try / rescue / after</h3>
<p>例外を捕捉します。通常は <code>with</code> や <code>{:ok, _}/{:error, _}</code> タプルを推奨します。</p>
<h3>カスタム例外</h3>
<p><code>defexception</code> でアプリケーション固有の例外を定義できます。</p>
`,
    defaultCode: `# with 式 - 複数ステップのバリデーション
defmodule UserRegistration do
  def register(params) do
    with {:ok, name}  <- validate_name(params[:name]),
         {:ok, age}   <- validate_age(params[:age]),
         {:ok, email} <- validate_email(params[:email]) do
      {:ok, %{name: name, age: age, email: email}}
    else
      {:error, field, msg} -> {:error, "\#{field}: \#{msg}"}
    end
  end

  defp validate_name(nil),  do: {:error, :name, "必須です"}
  defp validate_name(""),   do: {:error, :name, "空にできません"}
  defp validate_name(name), do: {:ok, name}

  defp validate_age(age) when is_integer(age) and age >= 18, do: {:ok, age}
  defp validate_age(age) when is_integer(age), do: {:error, :age, "18歳以上が必要です"}
  defp validate_age(_), do: {:error, :age, "数値が必要です"}

  defp validate_email(email) when is_binary(email) do
    if String.contains?(email, "@"),
      do: {:ok, email},
      else: {:error, :email, "@ が必要です"}
  end
  defp validate_email(_), do: {:error, :email, "文字列が必要です"}
end

IO.inspect(UserRegistration.register(%{name: "Alice", age: 25, email: "alice@example.com"}))
IO.inspect(UserRegistration.register(%{name: "", age: 25, email: "alice@example.com"}))
IO.inspect(UserRegistration.register(%{name: "Alice", age: 15, email: "alice@example.com"}))
IO.inspect(UserRegistration.register(%{name: "Alice", age: 25, email: "invalid"}))

# try / rescue
result = try do
  String.to_integer("not a number")
rescue
  e in ArgumentError -> {:error, e.message}
end
IO.inspect(result)

# カスタム例外
defmodule ValidationError do
  defexception [:message, :field]
end

try do
  raise ValidationError, message: "無効な値", field: :email
rescue
  e in ValidationError ->
    IO.puts("ValidationError on \#{e.field}: \#{e.message}")
end

# try / after（リソース解放保証）
try do
  result = 10 / 2
  IO.puts("結果: \#{result}")
after
  IO.puts("（クリーンアップ処理）")
end`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "if / unless / cond",
    description: `
<h2>if / unless / cond</h2>
<h3>if / unless</h3>
<p><code>if</code> は式です。値を返します。<code>false</code> と <code>nil</code> だけが偽です。</p>
<h3>cond</h3>
<p>最初に真となる条件の節を実行します。<code>else if</code> の代替です。最後の節に <code>true</code> を置いてデフォルトにします。</p>
`,
    defaultCode: `# if は式（値を返す）
x = 10
result = if x > 5 do
  "大きい"
else
  "小さい"
end
IO.puts(result)

# else なし（nil を返す可能性）
msg = if x > 100, do: "百超え"
IO.inspect(msg)   # nil

# unless（if の否定版）
unless x == 0 do
  IO.puts("ゼロではない")
end

# 1行スタイル
IO.puts(if x > 0, do: "正", else: "非正")

# falsy は false と nil だけ（0や""はtruthy）
Enum.each([false, nil, 0, "", [], %{}], fn v ->
  IO.puts("\#{inspect(v)}: \#{if v, do: "truthy", else: "falsy"}")
end)

# cond（複数条件）
score = 78
grade = cond do
  score >= 90 -> "A"
  score >= 80 -> "B"
  score >= 70 -> "C"
  score >= 60 -> "D"
  true        -> "F"   # デフォルト（必須）
end
IO.puts("成績: \#{grade}")`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "try / rescue / throw / exit",
    description: `
<h2>try / rescue / throw / exit</h2>
<h3>try / rescue</h3>
<p>例外（<code>raise</code>）を捕捉します。通常は <code>{:ok, value} / {:error, reason}</code> パターンを推奨します。</p>
<h3>throw / catch</h3>
<p>例外ではなく値を throw できます（早期脱出などに使用）。</p>
<h3>exit / Process.exit</h3>
<p>プロセスを終了させます。通常はスーパーバイザーに任せます。</p>
`,
    defaultCode: `# try / rescue
result = try do
  String.to_integer("abc")
rescue
  e in ArgumentError -> {:error, "引数エラー: \#{e.message}"}
  e in RuntimeError  -> {:error, "実行エラー: \#{e.message}"}
end
IO.inspect(result)

# 複数の例外型を一度にキャッチ
safe_divide = fn a, b ->
  try do
    {:ok, a / b}
  rescue
    ArithmeticError -> {:error, :division_by_zero}
  end
end
IO.inspect(safe_divide.(10, 2))
IO.inspect(safe_divide.(10, 0))

# after（finally相当）
try do
  IO.puts("処理中...")
  :ok
rescue
  e -> IO.puts("エラー: \#{e.message}")
after
  IO.puts("クリーンアップ（成功・失敗に関わらず実行）")
end

# カスタム例外
defmodule AppError do
  defexception [:message, :code]
end

try do
  raise AppError, message: "認証失敗", code: 401
rescue
  e in AppError -> IO.puts("AppError (\#{e.code}): \#{e.message}")
end

# throw / catch（早期脱出）
result = catch do
  :throw, val -> val
end do
  Enum.each(1..100, fn x ->
    if x == 42, do: throw(x)
  end)
  :not_found
end
IO.inspect(result)`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "おめでとうございます！（Ch.5）",
    description: `
<h2>Ch.5 完了！</h2>
<p>制御フローの章を修了しました！</p>
<ul>
  <li>✅ <strong>if / unless</strong> — 式として値を返す</li>
  <li>✅ <strong>cond</strong> — 複数条件の分岐</li>
  <li>✅ <strong>case</strong> — パターンマッチによる分岐（Ch.3参照）</li>
  <li>✅ <strong>with</strong> — パターンマッチの連鎖（Ch.3参照）</li>
  <li>✅ <strong>try / rescue</strong> — 例外処理</li>
  <li>✅ <strong>throw / catch</strong> — 早期脱出</li>
  <li>✅ <strong>カスタム例外</strong> — defexception</li>
</ul>
<p>Elixir の推奨スタイル：<br>
例外より <code>{:ok, value} / {:error, reason}</code> タプルを使いましょう。例外は「予期しない状況」のみに使います。</p>
<p>次は <strong>Ch.6: コレクションと Enum</strong> へ！</p>
`,
    defaultCode: `# 制御フローの選択ガイド

# 推奨: {:ok, _}/{:error, _} タプル
defmodule UserStore do
  def find(id) when id > 0 do
    if rem(id, 2) == 0,
      do:   {:ok, %{id: id, name: "User\#{id}"}},
      else: {:error, :not_found}
  end
  def find(_), do: {:error, :invalid_id}
end

# with で連鎖
result = with {:ok, user}  <- UserStore.find(4),
              true         <- user.id > 0 do
  "ユーザー取得: \#{user.name}"
else
  {:error, :not_found}   -> "見つかりません"
  {:error, :invalid_id}  -> "無効な ID"
  false                  -> "無効なユーザー"
end
IO.puts(result)

IO.puts(with {:ok, u} <- UserStore.find(3), do: u.name, else: ({:error, r} -> "Error: \#{r}"))

# cond vs case
status = 403
IO.puts(cond do
  status in 200..299 -> "成功"
  status in 300..399 -> "リダイレクト"
  status in 400..499 -> "クライアントエラー"
  status in 500..599 -> "サーバーエラー"
  true               -> "不明"
end)`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "for の reduce モード",
    description: `
<h2>for の reduce モード</h2>
<p>Elixir 1.12 以降、<code>for</code> に <code>reduce:</code> オプションを付けると、内包表記でアキュムレータを使えます。<code>Enum.reduce</code> と <code>for</code> の合体版です。</p>
`,
    defaultCode: `# for reduce: で累積
sum = for x <- 1..10, reduce: 0 do
  acc -> acc + x
end
IO.puts("sum = \#{sum}")

# フィルタ付きの reduce
even_sum = for x <- 1..10, rem(x, 2) == 0, reduce: 0 do
  acc -> acc + x
end
IO.puts("偶数の和 = \#{even_sum}")

# マップを構築する
freq = for word <- ~w(apple banana apple cherry banana apple), reduce: %{} do
  acc -> Map.update(acc, word, 1, &(&1 + 1))
end
IO.inspect(freq)

# 最大値を探す
max_val = for x <- [3,1,4,1,5,9,2,6], reduce: :neg_inf do
  acc -> if x > acc, do: x, else: acc
end
IO.puts("max = \#{max_val}")`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "Kernel の特殊関数",
    description: `
<h2>Kernel の特殊関数</h2>
<p><code>Kernel</code> モジュールの関数は自動的にインポートされます。制御フローに関係する便利関数を紹介します。</p>
<ul>
  <li><code>if/2</code>, <code>unless/2</code>, <code>cond/1</code> — マクロとして実装</li>
  <li><code>then/2</code>, <code>tap/2</code> — パイプライン補助</li>
  <li><code>elem/2</code>, <code>put_elem/3</code> — タプル操作</li>
  <li><code>apply/2,3</code> — 動的な関数呼び出し</li>
</ul>
`,
    defaultCode: `# apply（動的な関数呼び出し）
module = String
func   = :upcase
args   = ["hello"]

result = apply(module, func, args)
IO.puts(result)

# 関数を動的に決定
operations = [
  {Enum, :sum, [[1,2,3,4,5]]},
  {Enum, :max, [[3,1,4,1,5]]},
  {String, :length, ["hello world"]},
]

Enum.each(operations, fn {mod, fun, arg_list} ->
  result = apply(mod, fun, arg_list)
  IO.puts("\#{mod}.\#{fun}: \#{inspect(result)}")
end)

# max / min（Kernel）
IO.puts(max(3, 7))
IO.puts(min(3, 7))

# abs, round, floor, ceil（Kernel）
IO.puts(abs(-42))
IO.puts(round(3.7))
IO.puts(floor(3.7))
IO.puts(ceil(3.2))

# div, rem（Kernel）
IO.puts(div(17, 5))
IO.puts(rem(17, 5))`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "パターンマッチとフロー制御の組み合わせ",
    description: `
<h2>パターンマッチとフロー制御の組み合わせ</h2>
<p>Elixir では <code>case</code>・<code>cond</code>・<code>with</code>・関数節を組み合わせることで、複雑な制御フローを宣言的に書けます。</p>
`,
    defaultCode: `# 複合パターン：バリデーション + 変換 + 分岐
defmodule RequestHandler do
  def handle(%{method: method, path: path, body: body}) do
    with :ok           <- validate_method(method),
         {:ok, route}  <- match_route(method, path),
         {:ok, params} <- parse_body(body) do
      execute(route, params)
    else
      {:error, :invalid_method} -> {405, "Method Not Allowed"}
      {:error, :not_found}      -> {404, "Not Found"}
      {:error, :bad_body, msg}  -> {400, "Bad Request: \#{msg}"}
    end
  end

  defp validate_method(m) when m in [:get, :post, :put, :delete], do: :ok
  defp validate_method(_), do: {:error, :invalid_method}

  defp match_route(:get,  "/users"),     do: {:ok, :list_users}
  defp match_route(:post, "/users"),     do: {:ok, :create_user}
  defp match_route(:get,  "/health"),    do: {:ok, :health_check}
  defp match_route(_, _),               do: {:error, :not_found}

  defp parse_body(nil), do: {:ok, %{}}
  defp parse_body(b) when is_map(b), do: {:ok, b}
  defp parse_body(_), do: {:error, :bad_body, "must be a map"}

  defp execute(:list_users, _),   do: {200, "users: [Alice, Bob]"}
  defp execute(:create_user, p),  do: {201, "created: \#{inspect(p)}"}
  defp execute(:health_check, _), do: {200, "OK"}
end

IO.inspect(RequestHandler.handle(%{method: :get,  path: "/users",  body: nil}))
IO.inspect(RequestHandler.handle(%{method: :post, path: "/users",  body: %{name: "Carol"}}))
IO.inspect(RequestHandler.handle(%{method: :get,  path: "/404",    body: nil}))
IO.inspect(RequestHandler.handle(%{method: :patch, path: "/users", body: nil}))`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "例外処理 — try/rescue/catch",
    description: `
<h2>例外処理 — try/rescue/catch</h2>
<p>Elixir では <code>try/rescue</code> で例外をキャッチします。ただし Elixir のイディオムでは <code>{:ok, _}</code>/<code>{:error, _}</code> タプルによるエラー伝搬が推奨されます。</p>
<ul>
  <li><code>rescue</code> — 例外（RuntimeError など）をキャッチ</li>
  <li><code>catch</code> — <code>throw/1</code> の値やErlangエラーをキャッチ</li>
  <li><code>after</code> — 成功・失敗にかかわらず実行（finally に相当）</li>
  <li><code>raise/1</code> — 例外を発生させる</li>
</ul>
`,
    defaultCode: `# rescue で例外をキャッチ
result = try do
  String.to_integer("abc")
rescue
  ArgumentError -> {:error, "変換失敗"}
end
IO.inspect(result)

# 複数の例外パターン
def safe_divide(a, b) do
  try do
    {:ok, div(a, b)}
  rescue
    ArithmeticError -> {:error, "ゼロ除算"}
  end
end
IO.inspect(safe_divide(10, 2))
IO.inspect(safe_divide(10, 0))

# catch と throw（早期脱出パターン）
result2 = try do
  Enum.each(1..100, fn n ->
    if n * n > 50, do: throw({:found, n})
  end)
  :not_found
catch
  {:found, n} -> {:found, n}
end
IO.inspect(result2)

# after（クリーンアップ保証）
try do
  raise "意図的なエラー"
rescue
  e -> IO.puts("rescued: \#{e.message}")
after
  IO.puts("after は必ず実行される")
end`,
  },
  {
    chapter: "Ch.5: 制御フロー",
    title: "演習：制御フロー",
    description: `
<h2>演習：制御フロー</h2>
<p>これまで学んだ制御フローを使って実装してみましょう。</p>
<ol>
  <li><code>classify_bmi/1</code> — BMI を計算して分類を返す</li>
  <li><code>safe_parse_int/1</code> — 文字列を安全に整数に変換する</li>
  <li><code>fizzbuzz/1</code> — FizzBuzz を返す</li>
</ol>
`,
    defaultCode: `defmodule Exercise do
  # BMI 分類
  def classify_bmi(bmi) do
    cond do
      bmi < 18.5 -> "低体重"
      bmi < 25.0 -> "普通体重"
      bmi < 30.0 -> "過体重"
      true       -> "肥満"
    end
  end

  # 安全な整数変換（with を使用）
  def safe_parse_int(str) when is_binary(str) do
    with str = String.trim(str),
         {n, ""} <- Integer.parse(str) do
      {:ok, n}
    else
      _ -> {:error, "'\#{str}' は整数に変換できません"}
    end
  end
  def safe_parse_int(_), do: {:error, "文字列を渡してください"}

  # FizzBuzz（パターンマッチで実装）
  def fizzbuzz(n) do
    case {rem(n, 3), rem(n, 5)} do
      {0, 0} -> "FizzBuzz"
      {0, _} -> "Fizz"
      {_, 0} -> "Buzz"
      _      -> Integer.to_string(n)
    end
  end
end

IO.puts(Exercise.classify_bmi(16.0))
IO.puts(Exercise.classify_bmi(22.5))
IO.puts(Exercise.classify_bmi(27.0))
IO.puts(Exercise.classify_bmi(32.0))

IO.inspect(Exercise.safe_parse_int("42"))
IO.inspect(Exercise.safe_parse_int("  -7  "))
IO.inspect(Exercise.safe_parse_int("abc"))
IO.inspect(Exercise.safe_parse_int(99))

IO.inspect(for n <- 1..20, do: Exercise.fizzbuzz(n))`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "コレクション",
    description: `
<h2>コレクション</h2>
<p>Elixir の主要なコレクション型：</p>
<ul>
  <li><strong>リスト</strong> - <code>[1, 2, 3]</code> — 連結リスト（先頭追加が O(1)）</li>
  <li><strong>タプル</strong> - <code>{:ok, "hello"}</code> — 固定長、メモリ連続（インデックスアクセスが O(1)）</li>
  <li><strong>マップ</strong> - <code>%{key: "value"}</code> — キーバリューストア（任意の型をキーに使用可）</li>
  <li><strong>キーワードリスト</strong> - <code>[name: "Elixir"]</code> — アトムキーのリスト（順序保持）</li>
  <li><strong>MapSet</strong> - 重複なし集合</li>
</ul>
<p>リストは <code>hd/1</code>（先頭）と <code>tl/1</code>（残り）で操作します。</p>
`,
    defaultCode: `# リスト
list = [1, 2, 3, 4, 5]
IO.inspect(list)
IO.puts("先頭: \#{hd(list)}")
IO.inspect(tl(list), label: "残り")

# 先頭への追加は O(1)
IO.inspect([0 | list])

# リストの連結
IO.inspect([1, 2] ++ [3, 4])

# タプル
tuple = {:ok, "success", 200}
IO.inspect(tuple)
IO.puts("要素1: \#{elem(tuple, 1)}")
IO.puts("サイズ: \#{tuple_size(tuple)}")

# マップ
user = %{name: "Alice", age: 30, city: "Tokyo"}
IO.inspect(user)
IO.puts("名前: \#{user.name}")
IO.puts("年齢: \#{user[:age]}")

# マップの更新（新しいマップを作成）
updated = %{user | age: 31}
IO.inspect(updated)

# キーワードリスト（オプション渡しに使用）
opts = [timeout: 5000, retry: 3]
IO.inspect(opts)
IO.puts("timeout: \#{opts[:timeout]}")

# MapSet
set = MapSet.new([1, 2, 3, 2, 1])
IO.inspect(set)
IO.puts("member? \#{MapSet.member?(set, 2)}")
IO.inspect(MapSet.union(set, MapSet.new([4, 5])))`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Enum",
    description: `
<h2>Enum モジュール</h2>
<p><code>Enum</code> はコレクションを操作する豊富な関数を提供します。すべての操作は即時評価です。</p>
<h3>主な関数</h3>
<ul>
  <li><code>map/2</code> 変換、<code>filter/2</code> フィルタ、<code>reduce/3</code> 集約</li>
  <li><code>sort/2</code>、<code>sort_by/3</code>、<code>group_by/3</code></li>
  <li><code>flat_map/2</code>、<code>zip/2</code>、<code>uniq/1</code></li>
  <li><code>any?/2</code>、<code>all?/2</code>、<code>count/2</code>、<code>find/3</code></li>
  <li><code>chunk_every/2</code>、<code>take/2</code>、<code>drop/2</code></li>
</ul>
<h3>リスト内包表記</h3>
<p><code>for x &lt;- list, フィルタ条件, do: 式</code></p>
`,
    defaultCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map - 変換
IO.inspect(Enum.map(numbers, &(&1 * 2)))

# filter - フィルタリング
IO.inspect(Enum.filter(numbers, &(rem(&1, 2) == 0)))

# reduce - 集約
IO.puts(Enum.reduce(numbers, 0, &(&1 + &2)))
IO.puts(Enum.sum(numbers))
IO.puts(Enum.product(numbers))

# sort
words = ["banana", "apple", "cherry", "date"]
IO.inspect(Enum.sort(words))
IO.inspect(Enum.sort_by(words, &String.length/1))
IO.inspect(Enum.sort(numbers, :desc))

# group_by
IO.inspect(Enum.group_by(numbers, fn x ->
  if rem(x, 2) == 0, do: :even, else: :odd
end))

# any? / all? / count / find
IO.puts(Enum.any?(numbers, &(&1 > 9)))
IO.puts(Enum.all?(numbers, &(&1 > 0)))
IO.puts(Enum.count(numbers, &(rem(&1, 2) == 0)))
IO.inspect(Enum.find(numbers, &(&1 > 5)))

# flat_map
IO.inspect(Enum.flat_map([1, 2, 3], fn x -> [x, x * 10] end))

# zip
IO.inspect(Enum.zip([:a, :b, :c], [1, 2, 3]))

# chunk_every
IO.inspect(Enum.chunk_every(numbers, 3))

# リスト内包表記
squares = for x <- 1..5, do: x * x
IO.inspect(squares)

# ガード付き内包表記
even_squares = for x <- 1..10, rem(x, 2) == 0, do: x * x
IO.inspect(even_squares)

# 複数のジェネレーター
pairs = for x <- 1..3, y <- 1..3, x != y, do: {x, y}
IO.inspect(pairs)`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Stream（遅延評価）",
    description: `
<h2>Stream（遅延評価）</h2>
<p><code>Stream</code> は <code>Enum</code> の遅延版です。コレクションを一度にメモリに読み込まずに処理します。</p>
<h3>Enum vs Stream</h3>
<ul>
  <li><strong>Enum</strong> — 即時評価。各ステップで中間リストを作成。</li>
  <li><strong>Stream</strong> — 遅延評価。最終的な収集まで計算しない。大きなデータや無限列に効率的。</li>
</ul>
<h3>無限ストリーム</h3>
<p><code>Stream.iterate/2</code>、<code>Stream.cycle/1</code>、<code>Stream.unfold/2</code>、<code>Stream.repeatedly/1</code> で無限ストリームを作れます。</p>
`,
    defaultCode: `# Stream の基本（まだ計算されていない）
stream = Stream.map(1..100, &(&1 * 2))
result = stream |> Enum.take(5)
IO.inspect(result)

# パイプラインの比較
# Stream: 要素ごとにパイプライン全体を処理
stream_result =
  1..1000
  |> Stream.map(&(&1 * 2))
  |> Stream.filter(&(rem(&1, 6) == 0))
  |> Enum.take(5)   # ここで初めて評価
IO.inspect(stream_result)

# 無限ストリーム：自然数
naturals = Stream.iterate(1, &(&1 + 1))
IO.inspect(Enum.take(naturals, 10))

# フィボナッチ数列（無限）
fibs =
  Stream.unfold({0, 1}, fn {a, b} -> {a, {b, a + b}} end)
IO.inspect(Enum.take(fibs, 12))

# 無限サイクル
colors = Stream.cycle([:red, :green, :blue])
IO.inspect(Enum.take(colors, 7))

# Stream.repeatedly
IO.inspect(Stream.repeatedly(fn -> :rand.uniform(100) end) |> Enum.take(5))

# Stream.with_index
["apple", "banana", "cherry"]
|> Stream.with_index(1)
|> Enum.map(fn {fruit, i} -> "\#{i}. \#{fruit}" end)
|> Enum.each(&IO.puts/1)

# Stream.zip
first_10_fibs  = fibs |> Enum.take(10)
first_10_nats  = naturals |> Enum.take(10)
IO.inspect(Enum.zip(first_10_nats, first_10_fibs))

# Stream.scan（累積）
running_sum =
  1..10
  |> Stream.scan(0, &(&1 + &2))
  |> Enum.to_list()
IO.inspect(running_sum)`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "マップと構造体",
    description: `
<h2>マップと構造体</h2>
<h3>Map 操作</h3>
<p><code>Map</code> モジュールには豊富な操作関数があります。</p>
<ul>
  <li><code>Map.put/3</code>、<code>Map.get/3</code>、<code>Map.delete/2</code></li>
  <li><code>Map.merge/2</code>、<code>Map.update/4</code>、<code>Map.update!/3</code></li>
  <li><code>Map.keys/1</code>、<code>Map.values/1</code>、<code>Map.to_list/1</code></li>
  <li><code>get_in/2</code>、<code>put_in/3</code>、<code>update_in/3</code>（ネスト操作）</li>
</ul>
<h3>構造体（Struct）</h3>
<p><code>defstruct</code> でフィールドを持つ型安全なマップを定義します。マップのすべての操作と、型チェック（<code>is_struct/2</code>）が使えます。</p>
`,
    defaultCode: `# Map 操作
user = %{name: "Alice", age: 30, city: "Tokyo"}

# アクセス
IO.puts(user.name)
IO.puts(user[:age])
IO.puts(Map.get(user, :email, "N/A"))  # デフォルト値あり

# 更新（新しいマップを返す）
updated = %{user | age: 31}
IO.inspect(updated)

# キーの追加・削除
with_email = Map.put(user, :email, "alice@example.com")
IO.inspect(with_email)
without_city = Map.delete(user, :city)
IO.inspect(without_city)

# マージ
extra = %{hobby: "coding", lang: "Elixir"}
merged = Map.merge(user, extra)
IO.inspect(merged)

# update_in / get_in (ネストしたマップ)
data = %{user: %{profile: %{score: 100}}}
updated_data = update_in(data, [:user, :profile, :score], &(&1 + 50))
IO.puts(get_in(updated_data, [:user, :profile, :score]))

# 構造体の定義
defmodule Point do
  defstruct [:x, :y, z: 0]
end

defmodule Circle do
  defstruct [:center, radius: 1.0]
  def area(%Circle{radius: r}), do: :math.pi() * r * r
  def perimeter(%Circle{radius: r}), do: 2 * :math.pi() * r
end

# 構造体の作成
p = %Point{x: 1, y: 2}
IO.inspect(p)
IO.puts(p.x)

c = %Circle{center: p, radius: 5.0}
IO.puts("面積: \#{Float.round(Circle.area(c), 2)}")

# 構造体の更新
c2 = %{c | radius: 10.0}
IO.puts("面積: \#{Float.round(Circle.area(c2), 2)}")

# パターンマッチ
%Point{x: x, y: y} = p
IO.puts("x=\#{x}, y=\#{y}")

# is_struct チェック
IO.puts(is_struct(p, Point))
IO.puts(is_struct(%{x: 1}, Point))`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Enum 応用（sort / group_by / reduce）",
    description: `
<h2>Enum 応用</h2>
<h3>sort / sort_by</h3>
<p><code>Enum.sort/2</code> はデフォルト昇順。<code>sort_by/3</code> でキー関数を指定、<code>:asc/:desc</code> で順序を指定。</p>
<h3>group_by</h3>
<p>コレクションをキー関数の戻り値でグループ化します。結果はマップです。</p>
<h3>reduce</h3>
<p>コレクションを1つの値に畳み込みます。すべての Enum 操作は reduce で実装できます。</p>
`,
    defaultCode: `people = [
  %{name: "Alice", age: 30, dept: :eng},
  %{name: "Bob",   age: 25, dept: :sales},
  %{name: "Carol", age: 35, dept: :eng},
  %{name: "Dave",  age: 28, dept: :hr},
  %{name: "Eve",   age: 22, dept: :sales},
]

# sort_by（年齢順）
by_age = Enum.sort_by(people, & &1.age)
IO.inspect(Enum.map(by_age, & &1.name))

# sort_by + 降順
by_age_desc = Enum.sort_by(people, & &1.age, :desc)
IO.inspect(Enum.map(by_age_desc, & &1.name))

# group_by（部署でグループ化）
by_dept = Enum.group_by(people, & &1.dept)
Enum.each(by_dept, fn {dept, members} ->
  names = Enum.map(members, & &1.name)
  IO.puts("\#{dept}: \#{Enum.join(names, ", ")}")
end)

# reduce（最年長を探す）
oldest = Enum.reduce(people, fn p, acc ->
  if p.age > acc.age, do: p, else: acc
end)
IO.puts("最年長: \#{oldest.name} (\#{oldest.age})")

# reduce で統計
stats = Enum.reduce(people, %{count: 0, sum_age: 0}, fn p, acc ->
  %{count: acc.count + 1, sum_age: acc.sum_age + p.age}
end)
avg = stats.sum_age / stats.count
IO.puts("平均年齢: \#{Float.round(avg, 1)}")`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "for 内包表記",
    description: `
<h2>for 内包表記</h2>
<p><code>for</code> はコレクションを変換する内包表記です。<code>Enum.map</code> + <code>Enum.filter</code> を1つの式で書けます。</p>
<h3>構文</h3>
<pre><code>for generator, filter, do: expression</code></pre>
<h3>into オプション</h3>
<p><code>into: %{}</code> でマップを生成、<code>into: ""</code> で文字列を生成できます。</p>
`,
    defaultCode: `# 基本的な for
squares = for x <- 1..5, do: x * x
IO.inspect(squares)

# フィルタ付き
even_squares = for x <- 1..10, rem(x, 2) == 0, do: x * x
IO.inspect(even_squares)

# 複数のジェネレーター（直積）
pairs = for x <- 1..3, y <- 1..3, do: {x, y}
IO.inspect(pairs)

# 対角線を除外
non_diag = for x <- 1..3, y <- 1..3, x != y, do: {x, y}
IO.inspect(non_diag)

# into: でマップ生成
squares_map = for x <- 1..5, into: %{}, do: {x, x * x}
IO.inspect(squares_map)

# 文字列生成
chars = for c <- ~c"hello", into: "", do: <<c - 32>>  # 大文字化
IO.puts(chars)

# ネストしたコレクション
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = for row <- matrix, x <- row, do: x
IO.inspect(flat)

# ビット列のジェネレーター
pixels = for <<r::8, g::8, b::8 <- <<255, 0, 0, 0, 255, 0, 0, 0, 255>> >>,
             do: {r, g, b}
IO.inspect(pixels)`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "MapSet",
    description: `
<h2>MapSet</h2>
<p><code>MapSet</code> は重複なしの集合データ構造です。メンバーシップの確認が O(log n) です。</p>
<h3>集合演算</h3>
<ul>
  <li><code>MapSet.union/2</code> — 和集合</li>
  <li><code>MapSet.intersection/2</code> — 積集合</li>
  <li><code>MapSet.difference/2</code> — 差集合</li>
  <li><code>MapSet.subset?/2</code> — 部分集合チェック</li>
</ul>
`,
    defaultCode: `# MapSet の作成
a = MapSet.new([1, 2, 3, 4, 5])
b = MapSet.new([3, 4, 5, 6, 7])

IO.inspect(a)

# メンバーシップ確認
IO.puts(MapSet.member?(a, 3))    # true
IO.puts(MapSet.member?(a, 9))    # false

# 追加・削除
a2 = MapSet.put(a, 6)
a3 = MapSet.delete(a, 1)
IO.inspect(a2)
IO.inspect(a3)

# 集合演算
IO.inspect(MapSet.union(a, b),        label: "和集合")
IO.inspect(MapSet.intersection(a, b), label: "積集合")
IO.inspect(MapSet.difference(a, b),   label: "差集合 a-b")

# サイズ
IO.puts(MapSet.size(a))

# 変換
IO.inspect(MapSet.to_list(a))

# リストの重複除去
list = [1, 2, 3, 2, 1, 4, 3, 5]
unique = list |> MapSet.new() |> MapSet.to_list()
IO.inspect(unique)

# Enum と組み合わせ（MapSet は Enumerable）
IO.puts(Enum.sum(a))
IO.inspect(Enum.filter(a, &(&1 > 3)))`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "おめでとうございます！（Ch.6）",
    description: `
<h2>Ch.6 完了！</h2>
<p>コレクションと Enum の章を修了しました！</p>
<ul>
  <li>✅ <strong>リスト / タプル / マップ / キーワードリスト</strong></li>
  <li>✅ <strong>Enum.map / filter / reduce</strong></li>
  <li>✅ <strong>Enum.sort_by / group_by</strong></li>
  <li>✅ <strong>Stream（遅延評価）</strong></li>
  <li>✅ <strong>マップと構造体</strong></li>
  <li>✅ <strong>for 内包表記</strong></li>
  <li>✅ <strong>MapSet</strong></li>
</ul>
<p>次は <strong>Ch.7: 文字列とバイナリ</strong> へ！</p>
`,
    defaultCode: `# コレクション総合演習
# 商品データを様々な方法で集計する

products = [
  %{name: "Apple",  category: :fruit,  price: 150, stock: 100},
  %{name: "Banana", category: :fruit,  price: 80,  stock: 200},
  %{name: "Carrot", category: :veggie, price: 120, stock: 50},
  %{name: "Daikon", category: :veggie, price: 200, stock: 30},
  %{name: "Eggplant", category: :veggie, price: 180, stock: 80},
]

# 1. カテゴリ別グループ化
by_cat = Enum.group_by(products, & &1.category)
IO.inspect(Map.keys(by_cat))

# 2. カテゴリ別平均価格
avg_by_cat = Map.new(by_cat, fn {cat, items} ->
  avg = Enum.sum(Enum.map(items, & &1.price)) / length(items)
  {cat, Float.round(avg, 1)}
end)
IO.inspect(avg_by_cat)

# 3. 在庫金額上位3商品
top3 = products
  |> Enum.map(&Map.put(&1, :value, &1.price * &1.stock))
  |> Enum.sort_by(& &1.value, :desc)
  |> Enum.take(3)
  |> Enum.map(& "\#{&1.name}: ¥\#{&1.value}")
IO.inspect(top3)

# 4. 全商品の在庫金額合計（for 内包表記）
total = for %{price: p, stock: s} <- products, reduce: 0 do
  acc -> acc + p * s
end
IO.puts("総在庫金額: ¥\#{total}")`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Enum.zip / flat_map / chunk_every",
    description: `
<h2>Enum.zip / flat_map / chunk_every</h2>
<p>Enum モジュールの便利な高階関数をさらに見ていきましょう。</p>
<ul>
  <li><code>Enum.zip/2</code> — 2つのリストをペアのリストにまとめる</li>
  <li><code>Enum.flat_map/2</code> — map してから flatten（一段だけ）</li>
  <li><code>Enum.chunk_every/2</code> — N 個ずつのチャンクに分割</li>
  <li><code>Enum.zip_with/3</code> — zip しながら変換</li>
</ul>
`,
    defaultCode: `# zip — 2つのリストを対応させる
names = ["Alice", "Bob", "Carol"]
scores = [85, 92, 78]
pairs = Enum.zip(names, scores)
IO.inspect(pairs)  # [{"Alice", 85}, {"Bob", 92}, {"Carol", 78}]

# zip_with — zip + 変換
totals = Enum.zip_with(names, scores, fn name, score ->
  "\#{name}: \#{score}点"
end)
IO.inspect(totals)

# flat_map — ネストを一段展開
sentences = ["hello world", "foo bar baz"]
words = Enum.flat_map(sentences, &String.split/1)
IO.inspect(words)  # ["hello", "world", "foo", "bar", "baz"]

# chunk_every — N 個ずつ分割
IO.inspect(Enum.chunk_every(1..10, 3))
# [[1,2,3],[4,5,6],[7,8,9],[10]]

IO.inspect(Enum.chunk_every(1..10, 3, 2))
# スライディングウィンドウ（step=2）`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "List モジュール",
    description: `
<h2>List モジュール</h2>
<p><code>List</code> は Enum が持たない連結リスト固有の操作を提供します。</p>
<ul>
  <li><code>List.first/1</code>, <code>List.last/1</code></li>
  <li><code>List.flatten/1</code> — 深くネストしたリストを平坦化</li>
  <li><code>List.delete/2</code>, <code>List.delete_at/2</code></li>
  <li><code>List.insert_at/3</code>, <code>List.replace_at/3</code></li>
  <li><code>List.zip/1</code> — n 個のリストをまとめて zip</li>
</ul>
`,
    defaultCode: `list = [3, 1, 4, 1, 5, 9, 2, 6]

IO.inspect(List.first(list))          # 3
IO.inspect(List.last(list))           # 6
IO.inspect(List.delete(list, 1))      # 最初の 1 を削除
IO.inspect(List.delete_at(list, 2))   # インデックス 2 を削除

IO.inspect(List.insert_at(list, 3, 99))    # インデックス 3 に 99 挿入
IO.inspect(List.replace_at(list, 0, 100))  # インデックス 0 を 100 に置換

# flatten — 深いネストを解消
nested = [1, [2, [3, [4, 5]]], 6]
IO.inspect(List.flatten(nested))       # [1, 2, 3, 4, 5, 6]
IO.inspect(List.flatten(nested, [99])) # 末尾にリストを付加

# zip（3リスト以上）
a = [1, 2, 3]
b = ["a", "b", "c"]
c = [:x, :y, :z]
IO.inspect(List.zip([a, b, c]))`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Map アクセスパターン",
    description: `
<h2>Map アクセスパターン</h2>
<p>Map は Elixir で最も多用されるコレクションです。安全なアクセスパターンを覚えましょう。</p>
<ul>
  <li><code>Map.get/3</code> — デフォルト値付き取得</li>
  <li><code>Map.fetch!/2</code> — 存在しなければ例外</li>
  <li><code>Map.update/4</code> / <code>Map.update!/3</code></li>
  <li><code>Map.merge/3</code> — 競合時の解決関数付きマージ</li>
  <li><code>get_in/2</code>, <code>put_in/3</code>, <code>update_in/3</code> — ネストアクセス</li>
</ul>
`,
    defaultCode: `user = %{name: "Alice", age: 30, address: %{city: "Tokyo", zip: "100-0001"}}

# 安全なアクセス
IO.inspect(Map.get(user, :name))               # "Alice"
IO.inspect(Map.get(user, :email, "未設定"))    # "未設定"
IO.inspect(Map.fetch(user, :age))              # {:ok, 30}
IO.inspect(Map.fetch(user, :missing))          # :error

# 更新
user2 = Map.update!(user, :age, & &1 + 1)
IO.inspect(user2.age)  # 31

# マージ（競合解決）
defaults = %{role: "user", active: true}
overrides = %{role: "admin", name: "Bob"}
merged = Map.merge(defaults, overrides, fn _k, _default, override -> override end)
IO.inspect(merged)

# ネストアクセス
IO.inspect(get_in(user, [:address, :city]))         # "Tokyo"
user3 = put_in(user, [:address, :city], "Osaka")
IO.inspect(user3.address.city)
user4 = update_in(user, [:address, :zip], &String.replace(&1, "-", ""))
IO.inspect(user4.address.zip)`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Enum.any? / all? / find / count",
    description: `
<h2>Enum.any? / all? / find / count</h2>
<p>述語関数（predicate）を受け取る Enum 関数群です。</p>
<ul>
  <li><code>Enum.any?/2</code> — いずれかの要素が条件を満たすか</li>
  <li><code>Enum.all?/2</code> — 全要素が条件を満たすか</li>
  <li><code>Enum.find/3</code> — 条件を満たす最初の要素</li>
  <li><code>Enum.find_index/2</code> — 条件を満たす最初のインデックス</li>
  <li><code>Enum.count/2</code> — 条件を満たす要素の数</li>
  <li><code>Enum.reject/2</code> — 条件を満たさない要素</li>
</ul>
`,
    defaultCode: `numbers = [2, 5, 8, 13, 21, 34, 55]

# any? / all?
IO.inspect(Enum.any?(numbers, &(&1 > 50)))   # true
IO.inspect(Enum.all?(numbers, &(&1 > 0)))    # true
IO.inspect(Enum.all?(numbers, &(&1 < 50)))   # false

# find / find_index
IO.inspect(Enum.find(numbers, &(&1 > 10)))         # 13
IO.inspect(Enum.find(numbers, :none, &(&1 > 100))) # :none
IO.inspect(Enum.find_index(numbers, &(&1 > 10)))   # 3

# count / reject
IO.inspect(Enum.count(numbers, &rem(&1, 2) == 0))  # 偶数の数: 3
IO.inspect(Enum.reject(numbers, &rem(&1, 2) == 0)) # 奇数だけ

# 複合例：バリデーション
users = [
  %{name: "Alice", age: 25, active: true},
  %{name: "Bob",   age: 17, active: true},
  %{name: "Carol", age: 30, active: false},
]
all_adult?   = Enum.all?(users, &(&1.age >= 18))
any_inactive = Enum.any?(users, &(!&1.active))
minor        = Enum.find(users, &(&1.age < 18))
IO.inspect({all_adult?, any_inactive, minor.name})`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "Enum.scan / take_while / drop_while",
    description: `
<h2>Enum.scan / take_while / drop_while</h2>
<p>累積計算や条件に基づく部分取得のための関数です。</p>
<ul>
  <li><code>Enum.scan/3</code> — reduce の中間値をすべて返す</li>
  <li><code>Enum.take_while/2</code> — 条件が偽になるまで取得</li>
  <li><code>Enum.drop_while/2</code> — 条件が偽になるまで捨てる</li>
  <li><code>Enum.split_while/2</code> — take_while と drop_while を同時に</li>
</ul>
`,
    defaultCode: `# scan — 累積の途中経過を返す（prefix sums など）
IO.inspect(Enum.scan(1..6, 0, &+/2))
# [1, 3, 6, 10, 15, 21] — 累積和の各ステップ

# take_while / drop_while
data = [2, 4, 6, 7, 8, 10]
IO.inspect(Enum.take_while(data, &rem(&1, 2) == 0))  # [2, 4, 6]
IO.inspect(Enum.drop_while(data, &rem(&1, 2) == 0))  # [7, 8, 10]

# split_while — 2つ同時に
{evens, rest} = Enum.split_while(data, &rem(&1, 2) == 0)
IO.inspect({evens, rest})  # {[2,4,6], [7,8,10]}

# 実用例：ログのセクション分割
log = ["start", "info: a", "info: b", "error: oops", "info: c"]
{header, body} = Enum.split_while(log, &String.starts_with?(&1, "info"))
IO.inspect(header)
IO.inspect(body)

# scan でランニングmax
temps = [22, 25, 20, 28, 19, 30]
running_max = Enum.scan(temps, &max/2)
IO.inspect(running_max)`,
  },
  {
    chapter: "Ch.6: コレクションと Enum",
    title: "演習：コレクションと Enum",
    description: `
<h2>演習：コレクションと Enum</h2>
<p>これまでの Enum 関数を組み合わせて実装してみましょう。</p>
<ol>
  <li>単語リストから最も長い単語を返す <code>longest_word/1</code></li>
  <li>数値リストを偶数の2乗だけに変換する <code>even_squares/1</code></li>
  <li>リストの出現頻度マップを返す <code>frequencies/1</code></li>
</ol>
`,
    defaultCode: `defmodule CollectionEx do
  # 最も長い単語
  def longest_word(words) do
    Enum.max_by(words, &String.length/1)
  end

  # 偶数の2乗
  def even_squares(numbers) do
    numbers
    |> Enum.filter(&rem(&1, 2) == 0)
    |> Enum.map(&(&1 * &1))
  end

  # 出現頻度マップ
  def frequencies(list) do
    Enum.reduce(list, %{}, fn item, acc ->
      Map.update(acc, item, 1, & &1 + 1)
    end)
  end
end

words = ["apple", "banana", "cherry", "fig", "elderberry"]
IO.inspect(CollectionEx.longest_word(words))

IO.inspect(CollectionEx.even_squares(1..10))

IO.inspect(CollectionEx.frequencies(["a", "b", "a", "c", "b", "a"]))`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "文字列",
    description: `
<h2>文字列</h2>
<p>Elixir の文字列は UTF-8 エンコードされたバイナリです。</p>
<h3>主な文字列操作</h3>
<ul>
  <li><code>String.length/1</code> - 文字数</li>
  <li><code>String.upcase/1</code>, <code>String.downcase/1</code></li>
  <li><code>String.split/2</code>, <code>String.join/2</code></li>
  <li><code>String.replace/3</code>, <code>String.contains?/2</code></li>
  <li><code>String.trim/1</code>, <code>String.pad_leading/3</code></li>
</ul>
<h3>シジル（Sigils）</h3>
<p><code>~s{...}</code> 文字列、<code>~S{...}</code> 生文字列（エスケープなし）<br>
<code>~w{a b c}</code> 単語リスト、<code>~r/pattern/</code> 正規表現</p>
<h3>ヒアドキュメント</h3>
<p><code>"""..."""</code> で複数行文字列を記述できます。</p>
`,
    defaultCode: `# 基本的な文字列操作
str = "Hello, Elixir!"
IO.puts(String.length(str))           # 文字数
IO.puts(String.upcase(str))
IO.puts(String.downcase(str))
IO.puts(String.reverse(str))

# 分割・結合
words = String.split("one two three", " ")
IO.inspect(words)
IO.puts(Enum.join(words, ", "))

# 検索・置換
IO.puts(String.contains?(str, "Elixir"))
IO.puts(String.replace(str, "Elixir", "World"))
IO.puts(String.starts_with?(str, "Hello"))

# トリム・パディング
IO.puts(String.trim("  hello  "))
IO.puts(String.pad_leading("42", 6, "0"))   # "000042"

# シジル
words_list = ~w(apple banana cherry)
IO.inspect(words_list)

atom_list = ~w(foo bar baz)a   # アトムのリスト
IO.inspect(atom_list)

# 正規表現
IO.puts(String.match?("hello123", ~r/\d+/))
IO.inspect(Regex.scan(~r/\d+/, "abc123def456"))

# ヒアドキュメント（複数行文字列）
text = """
  行1
  行2
  行3
  """
IO.puts(text)

# 文字列補間
name = "Elixir"
version = 1
IO.puts("Language: \#{name}, Version: \#{version}")`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "String モジュール",
    description: `
<h2>String モジュール</h2>
<p>Elixir の文字列は UTF-8 エンコードされたバイナリです。<code>String</code> モジュールが豊富な操作関数を提供します。</p>
<h3>バイト数 vs 文字数</h3>
<p><code>byte_size/1</code> はバイト数、<code>String.length/1</code> は Unicode コードポイント数です。マルチバイト文字では異なります。</p>
`,
    defaultCode: `str = "Hello, Elixir！日本語"

# 長さ
IO.puts(String.length(str))      # 文字数
IO.puts(byte_size(str))          # バイト数（UTF-8）

# 大文字・小文字
IO.puts(String.upcase("hello"))
IO.puts(String.downcase("WORLD"))
IO.puts(String.capitalize("hello world"))

# 分割・結合
words = String.split("one, two, three", ", ")
IO.inspect(words)
IO.puts(Enum.join(words, " | "))

# 正規表現で分割
parts = String.split("a1b2c3", ~r/\d/)
IO.inspect(parts)

# 検索・置換
IO.puts(String.contains?("Hello", "ell"))
IO.puts(String.starts_with?("Hello", "He"))
IO.puts(String.ends_with?("Hello", "lo"))
IO.puts(String.replace("foo bar foo", "foo", "baz"))
IO.puts(String.replace("aabbcc", ~r/(.)\\1/, "\\\\1"))  # 重複除去

# トリム・パディング
IO.puts(String.trim("  hello  "))
IO.puts(String.trim_leading("--hello--", "-"))
IO.puts(String.pad_leading("42", 8, "0"))
IO.puts(String.pad_trailing("left", 10, "."))

# スライス
IO.puts(String.slice("Hello, World!", 7, 5))   # "World"
IO.puts(String.slice("Hello", -3, 3))           # "llo"`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "シジル（Sigils）",
    description: `
<h2>シジル（Sigils）</h2>
<p>シジルは特殊な構文でリテラルを生成します。<code>~</code> に続く文字でタイプが決まります。</p>
<table>
  <tr><th>シジル</th><th>結果</th><th>例</th></tr>
  <tr><td><code>~s{}</code></td><td>文字列</td><td><code>~s{hello \#{name}}</code></td></tr>
  <tr><td><code>~S{}</code></td><td>生文字列（補間・エスケープなし）</td><td><code>~S{hello \#{name}}</code></td></tr>
  <tr><td><code>~w{}</code></td><td>単語リスト（文字列）</td><td><code>~w{foo bar baz}</code></td></tr>
  <tr><td><code>~w{}a</code></td><td>単語リスト（アトム）</td><td><code>~w{ok error}a</code></td></tr>
  <tr><td><code>~r//</code></td><td>正規表現</td><td><code>~r/\d+/</code></td></tr>
  <tr><td><code>~c{}</code></td><td>チャーリスト</td><td><code>~c{hello}</code></td></tr>
</table>
`,
    defaultCode: `name = "Elixir"

# ~s: 文字列（補間あり）
s1 = ~s{Hello, \#{name}!}
IO.puts(s1)

# ~S: 生文字列（補間・エスケープなし）
s2 = ~S{Hello, \#{name}!\n}
IO.puts(s2)   # \#{name}\n がそのまま出力される

# ~w: 単語リスト
words_str  = ~w{apple banana cherry}
words_atom = ~w{ok error timeout}a

IO.inspect(words_str)
IO.inspect(words_atom)

# ~r: 正規表現
email_regex = ~r/^[\w.]+@[\w.]+\.\w{2,}$/
IO.puts(Regex.match?(email_regex, "user@example.com"))
IO.puts(Regex.match?(email_regex, "invalid-email"))

# 正規表現のマッチと取得
url = "Visit https://elixir-lang.org for more info"
IO.inspect(Regex.run(~r/https?:\/\/[\w.-]+/, url))
IO.inspect(Regex.scan(~r/\w+/, "Hello World"))

# ~c: チャーリスト
charlist = ~c{hello}
IO.inspect(charlist)         # [104, 101, 108, 108, 111]
IO.puts(is_list(charlist))

# カスタム区切り文字
IO.puts(~s|pipes work too|)
IO.inspect(~w[array style]a)`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "ヒアドキュメント",
    description: `
<h2>ヒアドキュメント</h2>
<p><code>"""..."""</code>（または <code>'...'</code>）で複数行の文字列を書けます。</p>
<h3>インデント除去</h3>
<p>閉じる <code>"""</code> の位置に合わせて先頭の空白が除去されます。</p>
<h3>@doc / @moduledoc</h3>
<p>Elixir のドキュメントはヒアドキュメントで書きます。<code>iex> 例</code> は doctestとして実行できます。</p>
`,
    defaultCode: `# 基本的なヒアドキュメント
text = """
  1行目
  2行目
  3行目
  """
IO.puts(text)
IO.puts("行数: \#{length(String.split(text, "\n", trim: true))}")

# インデント除去（閉じる """" の位置が基準）
indented = """
  Hello,
    World!
  """
IO.puts(indented)

# 補間も使える
name = "Elixir"
version = "1.17"
message = """
  Language: \#{name}
  Version:  \#{version}
  Website:  https://elixir-lang.org
  """
IO.puts(message)

# @doc でのヒアドキュメント
defmodule Math do
  @doc """
  2つの数値の合計を返します。

  ## 例

      iex> Math.add(1, 2)
      3

      iex> Math.add(-1, 1)
      0
  """
  def add(a, b), do: a + b
end

IO.puts(Math.add(3, 4))

# 生ヒアドキュメント（補間なし）
raw = \"""
  \#{これは補間されません}
  \n もエスケープされません
  \"""
IO.puts(raw)`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "おめでとうございます！（Ch.7）",
    description: `
<h2>Ch.7 完了！</h2>
<p>文字列とバイナリの章を修了しました！</p>
<ul>
  <li>✅ <strong>文字列は UTF-8 バイナリ</strong> — byte_size vs String.length</li>
  <li>✅ <strong>String モジュール</strong> — split / replace / trim / pad など</li>
  <li>✅ <strong>シジル</strong> — ~s, ~S, ~w, ~r, ~c</li>
  <li>✅ <strong>ヒアドキュメント</strong> — 複数行文字列、@doc</li>
  <li>✅ <strong>バイナリパターンマッチ</strong> — &lt;&lt;pattern&gt;&gt;（Ch.3参照）</li>
</ul>
<p>次は <strong>Ch.8: プロセスと並行性</strong> へ！</p>
`,
    defaultCode: `# 文字列処理の実践：CSV パーサー
defmodule CSV do
  def parse(text) do
    text
    |> String.trim()
    |> String.split("\n")
    |> Enum.map(&parse_row/1)
  end

  def parse_with_header(text) do
    [header | rows] = parse(text)
    Enum.map(rows, &Map.new(Enum.zip(header, &1)))
  end

  defp parse_row(row), do: String.split(row, ",") |> Enum.map(&String.trim/1)
end

csv = """
  name, age, city
  Alice, 30, Tokyo
  Bob, 25, Osaka
  Carol, 35, Nagoya
  """

rows = CSV.parse_with_header(csv)
IO.inspect(rows)

# 年齢が30以上の人を取り出す
IO.inspect(
  Enum.filter(rows, fn r ->
    {age, _} = Integer.parse(r["age"])
    age >= 30
  end)
  |> Enum.map(& &1["name"])
)`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "文字列の検索と置換",
    description: `
<h2>文字列の検索と置換</h2>
<p><code>String</code> モジュールの検索・置換系関数をまとめて学びます。</p>
<ul>
  <li><code>String.contains?/2</code>, <code>String.starts_with?/2</code>, <code>String.ends_with?/2</code></li>
  <li><code>String.replace/4</code> — 部分文字列・正規表現による置換</li>
  <li><code>String.split/3</code> — セパレータや正規表現で分割</li>
  <li><code>Regex.scan/3</code>, <code>Regex.replace/4</code></li>
</ul>
`,
    defaultCode: `text = "The quick brown fox jumps over the lazy dog"

# 検索
IO.inspect(String.contains?(text, "fox"))       # true
IO.inspect(String.starts_with?(text, "The"))    # true
IO.inspect(String.ends_with?(text, "cat"))      # false

# 置換
IO.inspect(String.replace(text, "fox", "cat"))
IO.inspect(String.replace(text, ~r/[aeiou]/, "*"))  # 母音をマスク

# 分割
IO.inspect(String.split(text))                  # スペース区切り
IO.inspect(String.split("a,b,,c", ",", trim: true))

# Regex
pattern = ~r/\\b\\w{5}\\b/  # 5文字の単語
words5 = Regex.scan(pattern, text) |> List.flatten()
IO.inspect(words5)

# キャプチャグループ
date = "2025-03-15"
case Regex.run(~r/(\\d{4})-(\\d{2})-(\\d{2})/, date) do
  [_, y, m, d] -> IO.puts("年:\#{y} 月:\#{m} 日:\#{d}")
  nil          -> IO.puts("マッチなし")
end`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "文字列のフォーマット",
    description: `
<h2>文字列のフォーマット</h2>
<p>Elixir には複数の文字列フォーマット手段があります。</p>
<ul>
  <li>文字列補間 <code>"\#{expr}"</code> — 最もシンプル</li>
  <li><code>:io_lib.format/2</code> — printf スタイル（Erlang互換）</li>
  <li><code>String.pad_leading/3</code>, <code>String.pad_trailing/3</code></li>
  <li><code>inspect/2</code> — デバッグ用の pretty print</li>
</ul>
`,
    defaultCode: `# 文字列補間（最も一般的）
name = "Alice"
score = 95.5
IO.puts("名前: \#{name}, スコア: \#{score}")

# :io.format で printf スタイル
:io.format("%-10s %5.1f%n", [name, score])

# 数値のパディング
for n <- [1, 10, 100, 1000] do
  IO.puts(String.pad_leading(Integer.to_string(n), 6))
end

# 表形式の出力
header = "| \#{String.pad_trailing("名前", 10)} | \#{String.pad_leading("スコア", 6)} |"
sep    = "| \#{String.duplicate("-", 10)} | \#{String.duplicate("-", 6)} |"
rows   = [{"Alice", 95}, {"Bob", 82}, {"Carol", 110}]

IO.puts(header)
IO.puts(sep)
Enum.each(rows, fn {n, s} ->
  IO.puts("| \#{String.pad_trailing(n, 10)} | \#{String.pad_leading(Integer.to_string(s), 6)} |")
end)`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "Charlist と Unicode",
    description: `
<h2>Charlist と Unicode</h2>
<p>Elixir には2種類の文字列表現があります。</p>
<ul>
  <li><strong>String (binary)</strong> — <code>"hello"</code> — UTF-8 バイナリ（推奨）</li>
  <li><strong>Charlist</strong> — <code>'hello'</code> — コードポイントの整数リスト（Erlang互換）</li>
</ul>
<p><code>String</code> モジュールは Unicode を正しく扱います（grapheme 単位）。</p>
`,
    defaultCode: `# String vs Charlist
s = "hello"
c = ~c'hello'
IO.inspect(s)              # "hello"
IO.inspect(c)              # ~c'hello' = [104, 101, 108, 108, 111]
IO.inspect(is_binary(s))   # true
IO.inspect(is_list(c))     # true

# 変換
IO.inspect(String.to_charlist("abc"))  # [97, 98, 99]
IO.inspect(List.to_string([97, 98, 99]))  # "abc"

# Unicode grapheme（絵文字・結合文字）
emoji = "👩‍💻"
IO.inspect(byte_size(emoji))           # バイト数（大きい）
IO.inspect(String.length(emoji))       # グラフィーム数: 1

japanese = "こんにちは"
IO.inspect(String.length(japanese))    # 5（文字数）
IO.inspect(byte_size(japanese))        # 15（UTF-8 は3バイト/文字）

# コードポイント確認
IO.inspect(String.codepoints("Å"))     # ["Å"]
IO.inspect(?A)                         # 65（文字リテラル）`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "バイナリ操作",
    description: `
<h2>バイナリ操作</h2>
<p>Elixir の文字列はバイナリであり、バイナリ構文で直接操作できます。バイナリパターンマッチはネットワーク・ファイル処理に強力です。</p>
`,
    defaultCode: `# バイナリリテラルとパターンマッチ
<<r, g, b>> = <<255, 128, 0>>
IO.inspect({r, g, b})  # {255, 128, 0}

# サイズ指定（ビット操作）
<<val::16>> = <<1, 0>>  # ビッグエンディアン 16bit
IO.inspect(val)          # 256

# バイナリの結合とスライス
bin = <<1, 2, 3, 4, 5>>
IO.inspect(binary_part(bin, 1, 3))   # <<2, 3, 4>>
IO.inspect(byte_size(bin))           # 5

# 文字列はバイナリ
<<h, rest::binary>> = "Hello"
IO.inspect(h)            # 72 (= ?H)
IO.inspect(rest)         # "ello"

# バイナリ構築（プロトコル実装例）
def encode_packet(type, payload) do
  len = byte_size(payload)
  <<type::8, len::16, payload::binary>>
end

packet = encode_packet(0x01, "ping")
IO.inspect(packet, base: :hex)

# デコード
<<ptype::8, plen::16, data::binary>> = packet
IO.inspect({ptype, plen, data})`,
  },
  {
    chapter: "Ch.7: 文字列とバイナリ",
    title: "演習：文字列とバイナリ",
    description: `
<h2>演習：文字列とバイナリ</h2>
<p>文字列操作の練習問題です。</p>
<ol>
  <li><code>word_count/1</code> — テキスト中の単語数をカウント</li>
  <li><code>title_case/1</code> — 各単語の先頭を大文字にする</li>
  <li><code>palindrome?/1</code> — 回文かどうか判定（英字のみ、大文字小文字無視）</li>
</ol>
`,
    defaultCode: `defmodule StringEx do
  def word_count(text) do
    text
    |> String.split(~r/\\s+/, trim: true)
    |> length()
  end

  def title_case(text) do
    text
    |> String.split(" ")
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
  end

  def palindrome?(text) do
    normalized =
      text
      |> String.downcase()
      |> String.replace(~r/[^a-z]/, "")
    normalized == String.reverse(normalized)
  end
end

IO.inspect(StringEx.word_count("  hello   world  foo  "))  # 3
IO.inspect(StringEx.title_case("the quick brown fox"))
IO.inspect(StringEx.palindrome?("A man a plan a canal Panama"))  # true
IO.inspect(StringEx.palindrome?("hello"))                        # false`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "プロセス",
    description: `
<h2>プロセス</h2>
<p>Elixir のプロセスは OS スレッドとは異なる軽量プロセスです。数百万個同時起動が可能で、状態はメモリを共有しません。</p>
<h3>基本操作</h3>
<ul>
  <li><code>spawn/1</code> — 新しいプロセスを起動（PID を返す）</li>
  <li><code>send/2</code> — メッセージ送信（非同期・失敗しない）</li>
  <li><code>receive/1</code> — メッセージ受信（パターンマッチ）</li>
  <li><code>self/0</code> — 自分の PID</li>
</ul>
<h3>after で受信タイムアウト</h3>
<pre><code>receive do
  msg -> handle(msg)
after 1000 -> :timeout
end</code></pre>
`,
    defaultCode: `# 自分のPIDを取得
IO.inspect(self())

# 基本的なspawnとメッセージ送信
caller = self()
pid = spawn(fn ->
  receive do
    {:hello, from} ->
      send(from, {:reply, "こんにちは！PID=\#{inspect(self())}"})
  end
end)

send(pid, {:hello, caller})

result = receive do
  {:reply, msg} -> msg
after
  1000 -> "タイムアウト"
end
IO.puts(result)

# カウンターサーバー（再帰プロセス）
defmodule Counter do
  def start(initial \\\\ 0) do
    spawn(fn -> loop(initial) end)
  end

  defp loop(count) do
    receive do
      {:increment, caller} ->
        new_count = count + 1
        send(caller, {:count, new_count})
        loop(new_count)

      {:add, n, caller} ->
        new_count = count + n
        send(caller, {:count, new_count})
        loop(new_count)

      {:get, caller} ->
        send(caller, {:count, count})
        loop(count)

      :stop ->
        IO.puts("カウンター停止 (最終値: \#{count})")
    end
  end
end

counter = Counter.start(0)
me = self()

send(counter, {:increment, me})
receive do {:count, n} -> IO.puts("カウント: \#{n}") end

send(counter, {:add, 5, me})
receive do {:count, n} -> IO.puts("カウント: \#{n}") end

send(counter, {:get, me})
receive do {:count, n} -> IO.puts("最終カウント: \#{n}") end

send(counter, :stop)

# Process モジュール
:timer.sleep(5)
IO.puts("プロセス生存確認: \#{Process.alive?(counter)}")`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "Task",
    description: `
<h2>Task</h2>
<p><code>Task</code> は非同期処理を簡単に扱うための OTP ラッパーです。<code>spawn</code> より安全で、エラー伝播も適切に行われます。</p>
<h3>主な関数</h3>
<ul>
  <li><code>Task.async/1</code> — 非同期タスクを起動</li>
  <li><code>Task.await/2</code> — 結果を待つ（デフォルト5秒タイムアウト）</li>
  <li><code>Task.async_stream/3</code> — コレクションを並列処理</li>
  <li><code>Task.yield/2</code> — タイムアウト付きで待つ（失敗しない）</li>
  <li><code>Task.shutdown/2</code> — タスクを終了させる</li>
</ul>
`,
    defaultCode: `# Task.async / Task.await
task1 = Task.async(fn ->
  :timer.sleep(10)
  {:result1, 42}
end)

task2 = Task.async(fn ->
  :timer.sleep(5)
  {:result2, "hello"}
end)

# 両方の結果を待つ（並列実行されている）
{:result1, r1} = Task.await(task1)
{:result2, r2} = Task.await(task2)
IO.puts("Task1: \#{r1}")
IO.puts("Task2: \#{r2}")

# Task.async_stream - コレクションの並列処理
items = ["item1", "item2", "item3", "item4", "item5"]

results =
  items
  |> Task.async_stream(fn item ->
    :timer.sleep(5)
    "\#{item} processed"
  end, max_concurrency: 3)
  |> Enum.map(fn {:ok, result} -> result end)
IO.inspect(results)

# タスクのリストを一括管理
tasks =
  1..5
  |> Enum.map(fn i ->
    Task.async(fn -> i * i end)
  end)

squares = Enum.map(tasks, &Task.await/1)
IO.inspect(squares)

# Task.yield（タイムアウト付き、失敗しない）
fast_task = Task.async(fn ->
  :timer.sleep(5)
  "速い処理"
end)

slow_task = Task.async(fn ->
  :timer.sleep(200)
  "遅い処理"
end)

IO.inspect(Task.yield(fast_task, 50))     # {:ok, "速い処理"}
IO.inspect(Task.yield(slow_task, 50))     # nil（タイムアウト）
Task.shutdown(slow_task)                  # クリーンアップ`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "リンクとモニター",
    description: `
<h2>リンクとモニター</h2>
<h3>リンク（Process.link / spawn_link）</h3>
<p>リンクされたプロセスの一方がクラッシュすると、もう一方にも終了シグナルが伝播します。</p>
<h3>モニター（Process.monitor）</h3>
<p>モニターは単方向です。監視先がクラッシュすると <code>:DOWN</code> メッセージを受け取るだけで自身はクラッシュしません。</p>
`,
    defaultCode: `# spawn_link（双方向クラッシュ伝播）
# 通常は spawn_link より Task.async や GenServer を使う

# Process.monitor（単方向監視）
monitored = spawn(fn ->
  :timer.sleep(20)
  IO.puts("子プロセス終了")
end)

ref = Process.monitor(monitored)

receive do
  {:DOWN, ^ref, :process, pid, reason} ->
    IO.puts("プロセス \#{inspect(pid)} が終了: \#{inspect(reason)}")
after 200 ->
  IO.puts("タイムアウト")
end

# Process モジュールの操作
IO.puts("現在のプロセス: \#{inspect(self())}")
IO.puts("プロセス数: \#{length(Process.list())}")

# プロセス辞書（グローバル状態、通常は非推奨）
Process.put(:key, "value")
IO.puts(Process.get(:key))

# send_after（遅延メッセージ）
Process.send_after(self(), :delayed_message, 10)
receive do
  :delayed_message -> IO.puts("遅延メッセージ受信！")
after 100 -> IO.puts("タイムアウト")
end`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "Agent",
    description: `
<h2>Agent</h2>
<p><code>Agent</code> は状態を持つプロセスを簡単に扱うための OTP ラッパーです。<code>GenServer</code> より軽量で、単純な状態管理に使います。</p>
<h3>主な関数</h3>
<ul>
  <li><code>Agent.start_link/2</code> — 初期状態で起動</li>
  <li><code>Agent.get/2</code> — 状態を読む</li>
  <li><code>Agent.update/2</code> — 状態を更新（非同期）</li>
  <li><code>Agent.get_and_update/2</code> — 読んで更新（アトミック）</li>
</ul>
`,
    defaultCode: `# Agent による状態管理
{:ok, counter} = Agent.start_link(fn -> 0 end)

# 状態の読み取り
IO.puts(Agent.get(counter, & &1))   # 0

# 状態の更新
Agent.update(counter, &(&1 + 1))
Agent.update(counter, &(&1 + 1))
IO.puts(Agent.get(counter, & &1))   # 2

# get_and_update（アトミックな読み+更新）
old = Agent.get_and_update(counter, fn n -> {n, n * 10} end)
IO.puts("旧値: \#{old}, 新値: \#{Agent.get(counter, & &1)}")

# リスト管理の Agent
{:ok, store} = Agent.start_link(fn -> [] end)

Enum.each(["Alice", "Bob", "Carol"], fn name ->
  Agent.update(store, fn list -> [name | list] end)
end)

IO.inspect(Agent.get(store, & &1))

# Agent でキャッシュ
{:ok, cache} = Agent.start_link(fn -> %{} end)

fetch = fn key, compute_fn ->
  Agent.get_and_update(cache, fn map ->
    case Map.fetch(map, key) do
      {:ok, val} -> {val, map}
      :error ->
        val = compute_fn.()
        {val, Map.put(map, key, val)}
    end
  end)
end

IO.puts(fetch.(:result, fn -> 1 + 1 end))
IO.puts(fetch.(:result, fn -> 999 end))  # キャッシュから

Agent.stop(counter)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "おめでとうございます！（Ch.8）",
    description: `
<h2>Ch.8 完了！</h2>
<p>プロセスと並行性の章を修了しました！</p>
<ul>
  <li>✅ <strong>プロセス</strong> — spawn / send / receive</li>
  <li>✅ <strong>リンクとモニター</strong> — 障害伝播の制御</li>
  <li>✅ <strong>Agent</strong> — シンプルな状態管理</li>
  <li>✅ <strong>Task</strong> — 非同期処理 / async_stream</li>
</ul>
<p>Elixir のプロセスは非常に軽量です（数KB、起動 ~1μs）。数十万プロセスを同時に動かせます。</p>
<p>次は <strong>Ch.9: OTP と GenServer</strong> へ！</p>
`,
    defaultCode: `# 並行処理の実践：並列 HTTP フェッチをシミュレート

defmodule FetchSimulator do
  # 遅延付きフェッチをシミュレート
  def fetch(url) do
    delay = :rand.uniform(50)
    :timer.sleep(delay)
    {:ok, %{url: url, status: 200, delay_ms: delay}}
  end
end

urls = [
  "https://api.example.com/users",
  "https://api.example.com/products",
  "https://api.example.com/orders",
  "https://api.example.com/inventory",
  "https://api.example.com/stats",
]

# 並列フェッチ（Task.async_stream）
start = System.monotonic_time(:millisecond)

results =
  urls
  |> Task.async_stream(&FetchSimulator.fetch/1, max_concurrency: 5, timeout: 1000)
  |> Enum.map(fn {:ok, result} -> result end)

elapsed = System.monotonic_time(:millisecond) - start

IO.puts("#{length(results)}件を #{elapsed}ms で取得（並列）")
Enum.each(results, fn {:ok, r} ->
  IO.puts("  \#{r.url} (\#{r.delay_ms}ms)")
end)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "プロセスの監視と linked プロセス",
    description: `
<h2>プロセスの監視と linked プロセス</h2>
<p>プロセスの生死を監視することで、耐障害性のあるシステムを構築できます。</p>
<ul>
  <li><code>Process.link/1</code> — リンク：相手が死ぬと自分も死ぬ（双方向）</li>
  <li><code>Process.monitor/1</code> — モニター：相手が死ぬと <code>:DOWN</code> メッセージを受け取る（一方向）</li>
  <li><code>trap_exit: true</code> — EXIT シグナルをメッセージとして受け取る</li>
</ul>
`,
    defaultCode: `# spawn_link — リンクしたプロセス
# リンク先がクラッシュすると親も終了する（Supervisor で制御）

# モニター — 安全に死亡を検知
pid = spawn(fn ->
  :timer.sleep(100)
  raise "crash!"
end)

ref = Process.monitor(pid)

receive do
  {:DOWN, ^ref, :process, _pid, reason} ->
    IO.puts("プロセスが終了: \#{inspect(reason)}")
after
  1000 -> IO.puts("タイムアウト")
end

# trap_exit でリンク先の終了をシグナルとして受け取る
Process.flag(:trap_exit, true)
child = spawn_link(fn ->
  :timer.sleep(50)
  exit(:normal)
end)

receive do
  {:EXIT, ^child, reason} ->
    IO.puts("子プロセス終了: \#{inspect(reason)}")
end`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "Agent — 状態の簡単な管理",
    description: `
<h2>Agent — 状態の簡単な管理</h2>
<p><code>Agent</code> は状態を保持するためのシンプルな抽象化です。GenServer のラッパーで、状態管理に特化しています。</p>
<ul>
  <li><code>Agent.start_link/1</code> — 初期状態を渡して起動</li>
  <li><code>Agent.get/2</code> — 状態を取得</li>
  <li><code>Agent.update/2</code> — 状態を更新</li>
  <li><code>Agent.get_and_update/2</code> — 取得と更新を同時に</li>
</ul>
`,
    defaultCode: `# シンプルなカウンター
{:ok, counter} = Agent.start_link(fn -> 0 end)

Agent.update(counter, & &1 + 1)
Agent.update(counter, & &1 + 1)
Agent.update(counter, & &1 + 5)
IO.inspect(Agent.get(counter, & &1))  # 7

# スタック（リスト）を状態として使う
{:ok, stack} = Agent.start_link(fn -> [] end)

Agent.update(stack, fn s -> ["first" | s] end)
Agent.update(stack, fn s -> ["second" | s] end)
Agent.update(stack, fn s -> ["third" | s] end)

# pop（get_and_update）
{top, _} = Agent.get_and_update(stack, fn [h | t] -> {h, t} end)
IO.puts("ポップ: \#{top}")  # "third"
IO.inspect(Agent.get(stack, & &1))  # ["second", "first"]

# キャッシュとして使う
{:ok, cache} = Agent.start_link(fn -> %{} end)
fetch = fn key ->
  Agent.get_and_update(cache, fn c ->
    case Map.fetch(c, key) do
      {:ok, v} -> {v, c}
      :error   ->
        v = "computed:\#{key}"
        {v, Map.put(c, key, v)}
    end
  end)
end
IO.inspect(fetch.(:foo))
IO.inspect(fetch.(:foo))  # キャッシュヒット`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "Task — 非同期処理",
    description: `
<h2>Task — 非同期処理</h2>
<p><code>Task</code> は非同期処理をシンプルに書くための抽象化です。</p>
<ul>
  <li><code>Task.async/1</code> + <code>Task.await/2</code> — 非同期実行して結果を待つ</li>
  <li><code>Task.async_stream/3</code> — コレクションを並列処理</li>
  <li><code>Task.start/1</code> — 結果不要なバックグラウンド処理</li>
</ul>
`,
    defaultCode: `# async + await
task1 = Task.async(fn ->
  :timer.sleep(100)
  "結果1"
end)
task2 = Task.async(fn ->
  :timer.sleep(150)
  "結果2"
end)

r1 = Task.await(task1)
r2 = Task.await(task2)
IO.inspect({r1, r2})

# Task.yield — タイムアウトを安全に処理
long_task = Task.async(fn ->
  :timer.sleep(500)
  "完了"
end)
case Task.yield(long_task, 200) || Task.shutdown(long_task) do
  {:ok, result} -> IO.puts("完了: \#{result}")
  nil           -> IO.puts("タイムアウト — タスクをシャットダウン")
end

# async_stream — リストを並列処理
items = 1..5
results =
  Task.async_stream(items, fn n ->
    :timer.sleep(10 * n)
    n * n
  end, max_concurrency: 3)
  |> Enum.map(fn {:ok, v} -> v end)
IO.inspect(results)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "メッセージパッシングパターン",
    description: `
<h2>メッセージパッシングパターン</h2>
<p>プロセス間通信のよく使われるパターンを学びます。</p>
<ul>
  <li><strong>ファイアーアンドフォーゲット</strong> — 応答不要の通知</li>
  <li><strong>リクエスト/リプライ</strong> — 応答を待つ同期的な呼び出し</li>
  <li><strong>ブロードキャスト</strong> — 複数プロセスへの一括送信</li>
</ul>
`,
    defaultCode: `# リクエスト/リプライパターン
server = spawn(fn ->
  receive do
    {from, :ping} ->
      send(from, :pong)
    {from, {:add, a, b}} ->
      send(from, {:result, a + b})
  end
end)

# ping/pong
send(server, {self(), :ping})
receive do
  :pong -> IO.puts("サーバーから pong!")
end

# ルーピングサーバー（再帰で状態を保持）
defmodule EchoServer do
  def start do
    spawn(&loop/0)
  end

  defp loop do
    receive do
      {from, msg} ->
        send(from, {:echo, msg})
        loop()  # 再帰で次のメッセージを待つ
      :stop -> :ok
    end
  end
end

echo = EchoServer.start()
send(echo, {self(), "Hello"})
receive do
  {:echo, msg} -> IO.puts("Echo: \#{msg}")
end
send(echo, :stop)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "プロセス辞書と ETS 入門",
    description: `
<h2>プロセス辞書と ETS 入門</h2>
<p>Elixir には不変データ以外の状態共有手段もあります（注意して使いましょう）。</p>
<ul>
  <li><strong>プロセス辞書</strong> — そのプロセス専用の破壊的 Key-Value ストア（テストが困難なため非推奨）</li>
  <li><strong>ETS (Erlang Term Storage)</strong> — インメモリの共有テーブル。非常に高速</li>
</ul>
`,
    defaultCode: `# プロセス辞書（使用は最小限に）
Process.put(:request_id, "req-123")
Process.put(:user_id, 42)

IO.inspect(Process.get(:request_id))   # "req-123"
IO.inspect(Process.get(:user_id))      # 42
IO.inspect(Process.get(:missing))      # nil

Process.delete(:user_id)
IO.inspect(Process.get())              # 残ったキー一覧

# ETS — プロセス間で共有できる高速テーブル
table = :ets.new(:my_cache, [:set, :public])

# 書き込み
:ets.insert(table, {:alice, 30})
:ets.insert(table, {:bob, 25})
:ets.insert(table, {:carol, 35})

# 読み取り
IO.inspect(:ets.lookup(table, :alice))   # [{:alice, 30}]
IO.inspect(:ets.lookup(table, :dave))    # []

# 全件取得・削除
IO.inspect(:ets.tab2list(table))
:ets.delete(table, :bob)
IO.inspect(:ets.tab2list(table))

:ets.delete(table)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "並行性のパターン — ワーカープール",
    description: `
<h2>並行性のパターン — ワーカープール</h2>
<p>実際のアプリでよく使う「ワーカープール」パターンを Task と Enum で実装します。</p>
`,
    defaultCode: `# シンプルなワーカープールシミュレーター
defmodule WorkerPool do
  @doc """
  items をワーカー数を上限に並列処理する。
  Task.async_stream の max_concurrency がまさにこれ。
  """
  def run(items, max_workers, fun) do
    items
    |> Task.async_stream(fun, max_concurrency: max_workers, timeout: 5000)
    |> Enum.reduce({[], []}, fn
      {:ok, result}, {oks, errs}    -> {[result | oks], errs}
      {:exit, reason}, {oks, errs}  -> {oks, [reason | errs]}
    end)
    |> then(fn {oks, errs} -> {Enum.reverse(oks), Enum.reverse(errs)} end)
  end
end

jobs = for i <- 1..10, do: i

{results, errors} = WorkerPool.run(jobs, 3, fn n ->
  :timer.sleep(50)  # 重い処理をシミュレート
  if rem(n, 7) == 0, do: raise("job \#{n} failed"), else: n * n
end)

IO.puts("成功: \#{length(results)} 件")
IO.puts("失敗: \#{length(errors)} 件")
IO.inspect(results)`,
  },
  {
    chapter: "Ch.8: プロセスと並行性",
    title: "演習：プロセスと並行性",
    description: `
<h2>演習：プロセスと並行性</h2>
<p>プロセスと並行性の理解を深める演習です。</p>
<ol>
  <li>ping-pong を 5 往復するプロセスペアを作る</li>
  <li>Agent を使った簡単なカウンターモジュールを実装する</li>
</ol>
`,
    defaultCode: `# 演習 1: Ping-Pong 5往復
defmodule PingPong do
  def start(n) do
    parent = self()
    pong = spawn(fn -> pong_loop() end)
    send(pong, {self(), :ping, n})
    receive do
      :done -> IO.puts("#{n}往復完了！")
    end
  end

  defp pong_loop do
    receive do
      {from, :ping, 0} ->
        IO.puts("pong (終了)")
        send(from, :done)
      {from, :ping, n} ->
        IO.puts("pong (\#{n})")
        :timer.sleep(50)
        send(from, {:pong, n - 1})
        pong_loop()
    end
  end
end

# 演習 2: Agent カウンター
defmodule Counter do
  def new(init \\\\ 0), do: Agent.start_link(fn -> init end)
  def inc({:ok, pid}),  do: (Agent.update(pid, & &1 + 1); {:ok, pid})
  def get({:ok, pid}),  do: Agent.get(pid, & &1)
  def reset({:ok, pid}), do: (Agent.update(pid, fn _ -> 0 end); {:ok, pid})
end

c = Counter.new()
c |> Counter.inc() |> Counter.inc() |> Counter.inc()
IO.inspect(Counter.get(c))  # 3
c |> Counter.reset()
IO.inspect(Counter.get(c))  # 0

PingPong.start(3)`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "GenServer",
    description: `
<h2>GenServer</h2>
<p><code>GenServer</code> は OTP の汎用サーバービヘイビアです。状態を持つプロセスのパターンを標準化します。</p>
<h3>コールバック</h3>
<ul>
  <li><code>init/1</code> — 初期化、初期状態を返す</li>
  <li><code>handle_call/3</code> — 同期呼び出し（返信あり）</li>
  <li><code>handle_cast/2</code> — 非同期呼び出し（返信なし）</li>
  <li><code>handle_info/2</code> — その他のメッセージ（<code>send/2</code> など）</li>
  <li><code>terminate/2</code> — 終了時のクリーンアップ</li>
</ul>
<h3>クライアントAPI</h3>
<p><code>GenServer.call/3</code>（同期）と <code>GenServer.cast/2</code>（非同期）</p>
`,
    defaultCode: `defmodule BankAccount do
  use GenServer

  # ===== クライアントAPI =====

  def start_link(initial_balance \\\\ 0) do
    GenServer.start_link(__MODULE__, initial_balance)
  end

  def deposit(pid, amount) do
    GenServer.cast(pid, {:deposit, amount})   # 非同期（返信なし）
  end

  def withdraw(pid, amount) do
    GenServer.call(pid, {:withdraw, amount})  # 同期（結果を返す）
  end

  def balance(pid), do: GenServer.call(pid, :balance)
  def history(pid), do: GenServer.call(pid, :history)

  # ===== サーバーコールバック =====

  @impl GenServer
  def init(initial_balance) do
    {:ok, %{balance: initial_balance, history: []}}
  end

  @impl GenServer
  def handle_cast({:deposit, amount}, state) do
    new_state = %{
      balance: state.balance + amount,
      history: [{:deposit, amount} | state.history]
    }
    {:noreply, new_state}
  end

  @impl GenServer
  def handle_call({:withdraw, amount}, _from, state) do
    if amount <= state.balance do
      new_state = %{
        balance: state.balance - amount,
        history: [{:withdraw, amount} | state.history]
      }
      {:reply, {:ok, new_state.balance}, new_state}
    else
      {:reply, {:error, "残高不足 (残高: \#{state.balance})"}, state}
    end
  end

  @impl GenServer
  def handle_call(:balance, _from, state), do: {:reply, state.balance, state}

  @impl GenServer
  def handle_call(:history, _from, state) do
    {:reply, Enum.reverse(state.history), state}
  end
end

# 使用例
{:ok, account} = BankAccount.start_link(1000)
IO.puts("初期残高: \#{BankAccount.balance(account)}")

BankAccount.deposit(account, 500)
BankAccount.deposit(account, 200)
IO.puts("入金後: \#{BankAccount.balance(account)}")

IO.inspect(BankAccount.withdraw(account, 300))
IO.inspect(BankAccount.withdraw(account, 2000))

IO.puts("最終残高: \#{BankAccount.balance(account)}")
IO.inspect(BankAccount.history(account))`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "Supervisor",
    description: `
<h2>Supervisor</h2>
<p><code>Supervisor</code> は子プロセスを監視し、クラッシュ時に自動的に再起動します。これが Elixir の「Let it crash」哲学の基盤です。</p>
<h3>監視戦略</h3>
<ul>
  <li><code>:one_for_one</code> — クラッシュした子だけ再起動（最もよく使う）</li>
  <li><code>:one_for_all</code> — 1つがクラッシュすると全員再起動</li>
  <li><code>:rest_for_one</code> — クラッシュした子以降を再起動</li>
</ul>
`,
    defaultCode: `defmodule Counter do
  use GenServer

  def start_link(name) do
    GenServer.start_link(__MODULE__, 0, name: name)
  end

  def increment(name), do: GenServer.cast(name, :increment)
  def get(name),       do: GenServer.call(name, :get)

  @impl true
  def init(n), do: {:ok, n}

  @impl true
  def handle_cast(:increment, n), do: {:noreply, n + 1}

  @impl true
  def handle_call(:get, _from, n), do: {:reply, n, n}
end

# Supervisor の起動
children = [
  {Counter, :counter_a},
  {Counter, :counter_b},
]

{:ok, sup} = Supervisor.start_link(children,
  strategy: :one_for_one
)

# 使用
Counter.increment(:counter_a)
Counter.increment(:counter_a)
Counter.increment(:counter_b)

IO.puts("A: \#{Counter.get(:counter_a)}")
IO.puts("B: \#{Counter.get(:counter_b)}")

# 監視状態の確認
IO.inspect(Supervisor.count_children(sup))
IO.inspect(Supervisor.which_children(sup))`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "handle_info と定期実行",
    description: `
<h2>handle_info と定期実行</h2>
<p><code>handle_info/2</code> は <code>GenServer.call/cast</code> 以外のメッセージ（<code>send/2</code> で送られたメッセージ、タイマーなど）を処理します。</p>
<h3>定期実行パターン</h3>
<p><code>Process.send_after(self(), :tick, interval)</code> で定期的にメッセージを自分に送り、<code>handle_info/2</code> で処理します。</p>
`,
    defaultCode: `defmodule Ticker do
  use GenServer

  def start_link(interval_ms) do
    GenServer.start_link(__MODULE__, interval_ms)
  end

  def get_ticks(pid), do: GenServer.call(pid, :get_ticks)

  @impl true
  def init(interval) do
    # 最初のタイマーをセット
    schedule_tick(interval)
    {:ok, %{ticks: 0, interval: interval}}
  end

  @impl true
  def handle_info(:tick, state) do
    new_state = Map.update!(state, :ticks, &(&1 + 1))
    IO.puts("Tick! count=\#{new_state.ticks}")
    # 次のタイマーをセット
    schedule_tick(state.interval)
    {:noreply, new_state}
  end

  @impl true
  def handle_call(:get_ticks, _from, state) do
    {:reply, state.ticks, state}
  end

  defp schedule_tick(interval) do
    Process.send_after(self(), :tick, interval)
  end
end

{:ok, ticker} = Ticker.start_link(30)
:timer.sleep(120)
IO.puts("合計 tick 数: \#{Ticker.get_ticks(ticker)}")`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "おめでとうございます！（Ch.9）",
    description: `
<h2>Ch.9 完了！</h2>
<p>OTP と GenServer の章を修了しました！</p>
<ul>
  <li>✅ <strong>GenServer</strong> — init / handle_call / handle_cast</li>
  <li>✅ <strong>Supervisor</strong> — 自動再起動、監視戦略</li>
  <li>✅ <strong>handle_info</strong> — 任意メッセージの処理</li>
  <li>✅ <strong>定期実行</strong> — send_after パターン</li>
</ul>
<h3>OTP の設計原則</h3>
<ul>
  <li>🔵 <strong>「Let it crash」</strong> — 防御的プログラミングより、クラッシュして再起動</li>
  <li>🔵 <strong>監視ツリー</strong> — Supervisor が Worker を監視する階層構造</li>
  <li>🔵 <strong>分離</strong> — プロセスは独立した状態を持ち、メッセージで通信</li>
</ul>
<p>次は <strong>Ch.10: プロトコルとビヘイビア</strong> へ！</p>
`,
    defaultCode: `# GenServer の全機能まとめ
defmodule Cache do
  use GenServer

  # Client API
  def start_link(ttl_ms \\\\ 60_000) do
    GenServer.start_link(__MODULE__, ttl_ms, name: __MODULE__)
  end

  def put(key, value), do: GenServer.call(__MODULE__, {:put, key, value})
  def get(key),        do: GenServer.call(__MODULE__, {:get, key})
  def delete(key),     do: GenServer.cast(__MODULE__, {:delete, key})
  def stats,           do: GenServer.call(__MODULE__, :stats)

  # Server callbacks
  @impl true
  def init(ttl_ms) do
    Process.send_after(self(), :cleanup, ttl_ms)
    {:ok, %{store: %{}, ttl_ms: ttl_ms, hits: 0, misses: 0}}
  end

  @impl true
  def handle_call({:put, k, v}, _, s),
    do: {:reply, :ok, put_in(s, [:store, k], {v, System.monotonic_time(:millisecond)})}

  @impl true
  def handle_call({:get, k}, _, s) do
    case Map.fetch(s.store, k) do
      {:ok, {v, _}} -> {:reply, {:ok, v}, %{s | hits: s.hits + 1}}
      :error        -> {:reply, :miss,    %{s | misses: s.misses + 1}}
    end
  end

  @impl true
  def handle_cast({:delete, k}, s), do: {:noreply, update_in(s, [:store], &Map.delete(&1, k))}

  @impl true
  def handle_call(:stats, _, s),
    do: {:reply, %{size: map_size(s.store), hits: s.hits, misses: s.misses}, s}

  @impl true
  def handle_info(:cleanup, s) do
    now = System.monotonic_time(:millisecond)
    fresh = Map.filter(s.store, fn {_, {_, t}} -> now - t < s.ttl_ms end)
    Process.send_after(self(), :cleanup, s.ttl_ms)
    {:noreply, %{s | store: fresh}}
  end
end

{:ok, _} = Cache.start_link(5000)
Cache.put("user:1", %{name: "Alice"})
Cache.put("user:2", %{name: "Bob"})
IO.inspect(Cache.get("user:1"))
IO.inspect(Cache.get("user:3"))
IO.inspect(Cache.stats())`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "GenServer コールバックの詳細",
    description: `
<h2>GenServer コールバックの詳細</h2>
<p>GenServer が持つ全コールバックを理解することで、より堅牢なサーバーを作れます。</p>
<ul>
  <li><code>init/1</code> — 起動時の初期化。<code>{:ok, state}</code> または <code>{:stop, reason}</code></li>
  <li><code>handle_call/3</code> — 同期呼び出し。<code>{:reply, reply, state}</code></li>
  <li><code>handle_cast/2</code> — 非同期呼び出し。<code>{:noreply, state}</code></li>
  <li><code>handle_info/2</code> — プロセスへの任意メッセージ（タイマーなど）</li>
  <li><code>terminate/2</code> — 終了時のクリーンアップ</li>
</ul>
`,
    defaultCode: `defmodule RateLimiter do
  use GenServer

  # クライアント API
  def start_link(max_per_sec), do: GenServer.start_link(__MODULE__, max_per_sec, name: __MODULE__)
  def check(key), do: GenServer.call(__MODULE__, {:check, key})
  def reset(key), do: GenServer.cast(__MODULE__, {:reset, key})

  # コールバック
  @impl true
  def init(max_per_sec) do
    # 毎秒カウンターをリセット
    schedule_reset()
    {:ok, %{max: max_per_sec, counts: %{}}}
  end

  @impl true
  def handle_call({:check, key}, _from, state) do
    count = Map.get(state.counts, key, 0)
    if count < state.max do
      new_state = update_in(state, [:counts, key], fn c -> (c || 0) + 1 end)
      {:reply, :ok, new_state}
    else
      {:reply, {:error, :rate_limited}, state}
    end
  end

  @impl true
  def handle_cast({:reset, key}, state) do
    {:noreply, update_in(state, [:counts], &Map.delete(&1, key))}
  end

  @impl true
  def handle_info(:reset_all, state) do
    schedule_reset()
    {:noreply, %{state | counts: %{}}}
  end

  @impl true
  def terminate(reason, _state) do
    IO.puts("RateLimiter 終了: \#{inspect(reason)}")
  end

  defp schedule_reset, do: Process.send_after(self(), :reset_all, 1000)
end

{:ok, _} = RateLimiter.start_link(3)
IO.inspect(RateLimiter.check("user:1"))  # :ok
IO.inspect(RateLimiter.check("user:1"))  # :ok
IO.inspect(RateLimiter.check("user:1"))  # :ok
IO.inspect(RateLimiter.check("user:1"))  # {:error, :rate_limited}`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "Supervisor — 子プロセスの監視",
    description: `
<h2>Supervisor — 子プロセスの監視</h2>
<p>Supervisor はプロセスが落ちたときに自動再起動する OTP ビヘイビアです。「落ちたら再起動すればいい」というElixirの哲学（Let it crash）を実現します。</p>
<ul>
  <li><code>:one_for_one</code> — 落ちた子プロセスだけ再起動</li>
  <li><code>:one_for_all</code> — 1つが落ちたら全員再起動</li>
  <li><code>:rest_for_one</code> — 落ちたプロセスとその後に起動したものを再起動</li>
</ul>
`,
    defaultCode: `defmodule MyWorker do
  use GenServer

  def start_link(name) do
    GenServer.start_link(__MODULE__, name, name: name)
  end

  def ping(name), do: GenServer.call(name, :ping)

  @impl true
  def init(name) do
    IO.puts("\#{name} 起動")
    {:ok, name}
  end

  @impl true
  def handle_call(:ping, _from, name) do
    {:reply, "pong from \#{name}", name}
  end
end

defmodule MyApp.Supervisor do
  use Supervisor

  def start_link(_) do
    Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  @impl true
  def init(:ok) do
    children = [
      {MyWorker, :worker_a},
      {MyWorker, :worker_b},
    ]
    Supervisor.init(children, strategy: :one_for_one)
  end
end

{:ok, sup} = MyApp.Supervisor.start_link(:ok)
IO.inspect(MyWorker.ping(:worker_a))
IO.inspect(MyWorker.ping(:worker_b))

# Supervisor の子一覧を確認
IO.inspect(Supervisor.which_children(sup))`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "DynamicSupervisor — 動的な子プロセス管理",
    description: `
<h2>DynamicSupervisor — 動的な子プロセス管理</h2>
<p><code>DynamicSupervisor</code> は実行時に子プロセスを動的に追加・削除できます。ユーザーセッション、ゲームルーム、コネクションプールなどに使います。</p>
`,
    defaultCode: `defmodule Session do
  use GenServer

  def start_link(user_id) do
    GenServer.start_link(__MODULE__, user_id)
  end

  def get_user(pid), do: GenServer.call(pid, :get_user)

  @impl true
  def init(user_id) do
    IO.puts("セッション開始: \#{user_id}")
    {:ok, %{user_id: user_id, started_at: System.monotonic_time()}}
  end

  @impl true
  def handle_call(:get_user, _from, state) do
    {:reply, state.user_id, state}
  end

  @impl true
  def terminate(_reason, state) do
    IO.puts("セッション終了: \#{state.user_id}")
  end
end

# DynamicSupervisor でセッション管理
{:ok, dsup} = DynamicSupervisor.start_link(strategy: :one_for_one)

# セッションを動的に追加
{:ok, pid1} = DynamicSupervisor.start_child(dsup, {Session, "user_alice"})
{:ok, pid2} = DynamicSupervisor.start_child(dsup, {Session, "user_bob"})

IO.inspect(Session.get_user(pid1))
IO.inspect(Session.get_user(pid2))
IO.inspect(DynamicSupervisor.count_children(dsup))

# セッションを終了
DynamicSupervisor.terminate_child(dsup, pid1)
IO.inspect(DynamicSupervisor.count_children(dsup))`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "Registry — プロセス名前解決",
    description: `
<h2>Registry — プロセス名前解決</h2>
<p><code>Registry</code> はプロセスに任意のキーで名前をつけ、検索できる OTP コンポーネントです。複数のプロセスを動的に管理するときに便利です。</p>
`,
    defaultCode: `# Registry を使ったプロセス名前解決
{:ok, _} = Registry.start_link(keys: :unique, name: MyRegistry)

defmodule NamedWorker do
  use GenServer

  def start_link(name) do
    GenServer.start_link(__MODULE__, name,
      name: {:via, Registry, {MyRegistry, name}})
  end

  def call(name, msg) do
    GenServer.call({:via, Registry, {MyRegistry, name}}, msg)
  end

  @impl true
  def init(name), do: {:ok, name}

  @impl true
  def handle_call(:whoami, _from, name), do: {:reply, name, name}
end

{:ok, _} = NamedWorker.start_link("alice")
{:ok, _} = NamedWorker.start_link("bob")

IO.inspect(NamedWorker.call("alice", :whoami))  # "alice"
IO.inspect(NamedWorker.call("bob",   :whoami))  # "bob"

# Registry で検索
IO.inspect(Registry.lookup(MyRegistry, "alice"))
IO.inspect(Registry.lookup(MyRegistry, "charlie"))  # []

# Registry.dispatch — 全登録プロセスに一括送信
IO.inspect(Registry.count(MyRegistry))`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "Application ビヘイビア",
    description: `
<h2>Application ビヘイビア</h2>
<p>OTP Application は Elixir/Erlang アプリケーションの最上位コンテナです。<code>mix new</code> で生成されたプロジェクトは自動的に Application を持ちます。</p>
<ul>
  <li><code>use Application</code> — ビヘイビアを実装</li>
  <li><code>start/2</code> — アプリ起動時にトップレベル Supervisor を起動</li>
  <li><code>mix.exs</code> の <code>application/0</code> でエントリポイントを指定</li>
</ul>
`,
    defaultCode: `# Application の構造（実際の mix プロジェクトでの実装）
defmodule MyApp.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # ここに Supervisor ツリーの子を並べる
      # {MyApp.Repo, []},
      # {MyApp.Endpoint, []},
      # {MyApp.Worker, name: MyApp.Worker},
    ]

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end

# mix.exs の設定（参考）
# def application do
#   [
#     mod: {MyApp.Application, []},
#     extra_applications: [:logger]
#   ]
# end

# Application の基本動作を確認
IO.puts("現在の OTP アプリ一覧:")
for app <- Application.loaded_applications() do
  {name, desc, vsn} = app
  IO.puts("  \#{name} (\#{vsn}): \#{desc}")
end`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "ETS と永続化パターン",
    description: `
<h2>ETS と永続化パターン</h2>
<p>ETS (Erlang Term Storage) を GenServer と組み合わせることで、高速なインメモリストアを実装できます。</p>
`,
    defaultCode: `defmodule FastStore do
  use GenServer

  @table :fast_store

  # クライアント API
  def start_link(_), do: GenServer.start_link(__MODULE__, nil, name: __MODULE__)
  def put(k, v),     do: :ets.insert(@table, {k, v})   # ETS へ直接書込（高速）
  def get(k),        do: case :ets.lookup(@table, k) do
                           [{_k, v}] -> {:ok, v}
                           []        -> :error
                         end
  def delete(k),     do: :ets.delete(@table, k)
  def all,           do: :ets.tab2list(@table)

  # GenServer が ETS テーブルの「所有者」として管理
  @impl true
  def init(_) do
    :ets.new(@table, [:set, :public, :named_table, read_concurrency: true])
    {:ok, nil}
  end
end

{:ok, _} = FastStore.start_link(nil)

FastStore.put("name", "Alice")
FastStore.put("age", 30)
FastStore.put("city", "Tokyo")

IO.inspect(FastStore.get("name"))
IO.inspect(FastStore.get("missing"))
IO.inspect(FastStore.all())

FastStore.delete("age")
IO.inspect(FastStore.all())`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "GenStage 入門 — バックプレッシャー",
    description: `
<h2>GenStage 入門 — バックプレッシャー</h2>
<p>GenStage は Producer-Consumer パイプラインを実装する OTP ビヘイビアです。処理速度の差をバックプレッシャーで自動調整します（別途 <code>gen_stage</code> 依存が必要）。</p>
<p>ここでは概念を理解するためのシミュレーション実装を示します。</p>
`,
    defaultCode: `# GenStage の概念シミュレーション（標準ライブラリのみ）
# 実際の GenStage は {:gen_stage, "~> 1.0"} が必要

defmodule Pipeline do
  @doc """
  Producer -> [Transformers] -> Consumer パイプラインを Stream で模倣
  """
  def run(source, stages, sink) do
    source
    |> Stream.transform(nil, fn item, _ -> {[item], nil} end)
    |> then(fn s ->
      Enum.reduce(stages, s, fn stage_fn, acc -> Stream.map(acc, stage_fn) end)
    end)
    |> Enum.each(sink)
  end
end

# パイプライン定義
source = 1..20

stages = [
  fn n -> n * 2 end,            # 2倍
  fn n -> n + 1 end,            # +1
  &Integer.to_string/1,         # 文字列化
  fn s -> "item: \#{s}" end,    # フォーマット
]

sink = fn item -> IO.puts(item) end

Pipeline.run(source, stages, sink)`,
  },
  {
    chapter: "Ch.9: OTP と GenServer",
    title: "演習：OTP と GenServer",
    description: `
<h2>演習：OTP と GenServer</h2>
<p>GenServer を使った実践的な課題です。</p>
<ol>
  <li>スタック GenServer — push/pop/peek をサポート</li>
  <li>タイマー付きカウンター — 毎秒インクリメントし、現在値を取得できる</li>
</ol>
`,
    defaultCode: `# 演習 1: スタック GenServer
defmodule Stack do
  use GenServer

  def start_link(init \\\\ []), do: GenServer.start_link(__MODULE__, init, name: __MODULE__)
  def push(item), do: GenServer.cast(__MODULE__, {:push, item})
  def pop,        do: GenServer.call(__MODULE__, :pop)
  def peek,       do: GenServer.call(__MODULE__, :peek)
  def size,       do: GenServer.call(__MODULE__, :size)

  @impl true
  def init(init), do: {:ok, init}

  @impl true
  def handle_cast({:push, item}, stack), do: {:noreply, [item | stack]}

  @impl true
  def handle_call(:pop, _from, []),      do: {:reply, {:error, :empty}, []}
  def handle_call(:pop, _from, [h|t]),   do: {:reply, {:ok, h}, t}
  def handle_call(:peek, _from, []),     do: {:reply, {:error, :empty}, []}
  def handle_call(:peek, _from, s=[h|_]), do: {:reply, {:ok, h}, s}
  def handle_call(:size, _from, s),      do: {:reply, length(s), s}
end

{:ok, _} = Stack.start_link()
Stack.push(1)
Stack.push(2)
Stack.push(3)
IO.inspect(Stack.peek())  # {:ok, 3}
IO.inspect(Stack.pop())   # {:ok, 3}
IO.inspect(Stack.pop())   # {:ok, 2}
IO.inspect(Stack.size())  # 1`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "プロトコル",
    description: `
<h2>プロトコル</h2>
<p>プロトコルは Elixir のポリモーフィズム機構です。異なる型に対して同じインターフェースを実装できます。</p>
<h3>プロトコルの定義と実装</h3>
<pre><code>defprotocol Describable do
  def describe(value)
end

defimpl Describable, for: Integer do
  def describe(n), do: "整数: \#{n}"
end</code></pre>
<h3>組み込みプロトコル</h3>
<ul>
  <li><code>String.Chars</code> — <code>to_string/1</code> / 文字列補間</li>
  <li><code>Inspect</code> — <code>IO.inspect/1</code></li>
  <li><code>Enumerable</code> — <code>Enum</code> との連携</li>
  <li><code>Collectable</code> — <code>Enum.into/2</code></li>
</ul>
`,
    defaultCode: `# プロトコルの定義
defprotocol Shapeable do
  @doc "面積を計算する"
  def area(shape)

  @doc "説明文を返す"
  def describe(shape)
end

# 構造体の定義
defmodule Rect do
  defstruct [:width, :height]
end
defmodule Triangle do
  defstruct [:base, :height]
end
defmodule Disk do
  defstruct [:radius]
end

# 各型への実装
defimpl Shapeable, for: Rect do
  def area(%Rect{width: w, height: h}), do: w * h
  def describe(%Rect{width: w, height: h}), do: "長方形 \#{w}×\#{h}"
end

defimpl Shapeable, for: Triangle do
  def area(%Triangle{base: b, height: h}), do: b * h / 2
  def describe(%Triangle{base: b, height: h}), do: "三角形 底辺\#{b} 高さ\#{h}"
end

defimpl Shapeable, for: Disk do
  def area(%Disk{radius: r}), do: :math.pi() * r * r
  def describe(%Disk{radius: r}), do: "円 半径\#{r}"
end

# 使用例
shapes = [
  %Rect{width: 4, height: 3},
  %Triangle{base: 6, height: 4},
  %Disk{radius: 5}
]

Enum.each(shapes, fn shape ->
  area = shape |> Shapeable.area() |> Float.round(2)
  IO.puts("\#{Shapeable.describe(shape)}: 面積 = \#{area}")
end)

# 合計面積
total = Enum.sum(Enum.map(shapes, &Shapeable.area/1))
IO.puts("合計面積: \#{Float.round(total, 2)}")

# String.Chars プロトコルの実装
defimpl String.Chars, for: Rect do
  def to_string(%Rect{width: w, height: h}), do: "Rect(\#{w}x\#{h})"
end

rect = %Rect{width: 3, height: 4}
IO.puts("文字列化: \#{rect}")    # String.Chars が呼ばれる

# Inspect プロトコル（デフォルト実装）
IO.inspect(rect)`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "ビヘイビア（Behaviour）",
    description: `
<h2>ビヘイビア（Behaviour）</h2>
<p>ビヘイビアは「このモジュールが実装すべきコールバック関数」を定義するインターフェースです。</p>
<h3>定義方法</h3>
<pre><code>defmodule Parser do
  @callback parse(String.t()) :: {:ok, term()} | {:error, String.t()}
end</code></pre>
<h3>使いどころ</h3>
<p>プラグイン / アダプター / 差し替え可能な実装を作るときに使います。<code>GenServer</code> や <code>Supervisor</code> 自体もビヘイビアです。</p>
`,
    defaultCode: `# ビヘイビアの定義
defmodule Notifier do
  @doc "通知を送る"
  @callback send(recipient :: String.t(), message :: String.t()) ::
              :ok | {:error, String.t()}

  @doc "送信者の名前を返す"
  @callback name() :: String.t()
end

# メール実装
defmodule EmailNotifier do
  @behaviour Notifier

  @impl Notifier
  def name, do: "Email"

  @impl Notifier
  def send(to, message) do
    IO.puts("📧 メール送信 to=\#{to}: \#{message}")
    :ok
  end
end

# Slack 実装
defmodule SlackNotifier do
  @behaviour Notifier

  @impl Notifier
  def name, do: "Slack"

  @impl Notifier
  def send(channel, message) do
    IO.puts("💬 Slack送信 #\#{channel}: \#{message}")
    :ok
  end
end

# 実装を差し替え可能に使う
defmodule AlertService do
  def alert(notifier, recipient, message) do
    IO.puts("[\#{notifier.name()}] 通知送信中...")
    notifier.send(recipient, message)
  end
end

AlertService.alert(EmailNotifier, "admin@example.com", "サーバーアラート")
AlertService.alert(SlackNotifier, "alerts", "CPU使用率90%超過")`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "組み込みプロトコル",
    description: `
<h2>組み込みプロトコル</h2>
<p>Elixir には多くの組み込みプロトコルがあります。カスタム型にこれらを実装することで、標準関数との連携が可能になります。</p>
<ul>
  <li><strong>String.Chars</strong> — <code>to_string/1</code>、文字列補間で使われる</li>
  <li><strong>Inspect</strong> — <code>IO.inspect/1</code> での表示形式</li>
  <li><strong>Enumerable</strong> — <code>Enum</code> / <code>Stream</code> との連携</li>
  <li><strong>Collectable</strong> — <code>Enum.into/2</code> でコレクションに変換</li>
</ul>
`,
    defaultCode: `# カスタム型
defmodule Color do
  defstruct [:r, :g, :b, :a]

  def new(r, g, b, a \\\\ 255), do: %Color{r: r, g: g, b: b, a: a}

  # String.Chars プロトコル（文字列補間で使われる）
  defimpl String.Chars do
    def to_string(%Color{r: r, g: g, b: b}) do
      "#\#{Integer.to_string(r, 16) |> String.pad_leading(2, "0")}\#{Integer.to_string(g, 16) |> String.pad_leading(2, "0")}\#{Integer.to_string(b, 16) |> String.pad_leading(2, "0")}"
    end
  end

  # Inspect プロトコル（IO.inspect の表示形式）
  defimpl Inspect do
    def inspect(%Color{r: r, g: g, b: b, a: a}, _opts) do
      "Color(rgb(\#{r},\#{g},\#{b}), alpha=\#{a})"
    end
  end
end

red   = Color.new(255, 0, 0)
green = Color.new(0, 255, 0)
blue  = Color.new(0, 0, 255, 128)

# String.Chars が使われる
IO.puts("赤: \#{red}")
IO.puts("緑: \#{green}")
IO.puts("青: \#{blue}")

# Inspect が使われる
IO.inspect(red)
IO.inspect([red, green, blue])`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "おめでとうございます！（Ch.10）",
    description: `
<h2>Ch.10 完了！</h2>
<p>プロトコルとビヘイビアの章を修了しました！</p>
<ul>
  <li>✅ <strong>プロトコル</strong> — defprotocol / defimpl でポリモーフィズム</li>
  <li>✅ <strong>ビヘイビア</strong> — @callback / @behaviour でインターフェース</li>
  <li>✅ <strong>組み込みプロトコル</strong> — String.Chars / Inspect / Enumerable</li>
</ul>
<h3>プロトコル vs ビヘイビア</h3>
<table>
  <tr><th></th><th>プロトコル</th><th>ビヘイビア</th></tr>
  <tr><td>対象</td><td>型（データ）</td><td>モジュール</td></tr>
  <tr><td>実装</td><td>defimpl</td><td>@impl</td></tr>
  <tr><td>ディスパッチ</td><td>値の型で動的</td><td>モジュールを明示</td></tr>
</table>
<p>次は最後の章 <strong>Ch.11: 型仕様とメタプログラミング</strong> へ！</p>
`,
    defaultCode: `# プロトコルとビヘイビアの組み合わせ

# Serializable プロトコル（型ごとに実装）
defprotocol Serializable do
  def serialize(value)
  def deserialize(type, data)
end

defmodule Point do
  defstruct [:x, :y]

  defimpl Serializable do
    def serialize(%Point{x: x, y: y}), do: "\#{x},\#{y}"
    def deserialize(_, s) do
      [x, y] = String.split(s, ",") |> Enum.map(&String.to_integer/1)
      %Point{x: x, y: y}
    end
  end
end

p = %Point{x: 10, y: 20}
serialized = Serializable.serialize(p)
IO.puts("シリアライズ: \#{serialized}")
restored = Serializable.deserialize(Point, serialized)
IO.inspect(restored)

# ビヘイビアで永続化バックエンドを差し替え可能に
defmodule Storage do
  @callback save(key :: String.t(), value :: term()) :: :ok
  @callback load(key :: String.t()) :: {:ok, term()} | :error
end

defmodule MemoryStorage do
  @behaviour Storage
  @agent __MODULE__

  def start, do: Agent.start_link(fn -> %{} end, name: @agent)

  @impl Storage
  def save(key, val), do: Agent.update(@agent, &Map.put(&1, key, val))

  @impl Storage
  def load(key), do: Agent.get(@agent, &Map.fetch(&1, key))
end

MemoryStorage.start()
MemoryStorage.save("user:1", %{name: "Alice"})
IO.inspect(MemoryStorage.load("user:1"))
IO.inspect(MemoryStorage.load("user:99"))`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "組み込みプロトコルの実装",
    description: `
<h2>組み込みプロトコルの実装</h2>
<p>Elixir の標準プロトコルを自作の型に実装することで、言語の演算子・関数と統合できます。</p>
<ul>
  <li><code>String.Chars</code> — <code>to_string/1</code> および文字列補間</li>
  <li><code>Inspect</code> — <code>inspect/1</code> および IEx の表示</li>
  <li><code>Enumerable</code> — <code>Enum</code> / <code>Stream</code> のすべての関数</li>
  <li><code>Collectable</code> — <code>Enum.into/2</code> のターゲットになれる</li>
</ul>
`,
    defaultCode: `defmodule Money do
  defstruct amount: 0, currency: :jpy

  defimpl String.Chars do
    def to_string(%Money{amount: a, currency: :jpy}) do
      "¥\#{:erlang.float_to_binary(a * 1.0, decimals: 0) |> String.replace(".0", "")}"
    end
    def to_string(%Money{amount: a, currency: c}) do
      "\#{a} \#{c}"
    end
  end

  defimpl Inspect do
    def inspect(%Money{amount: a, currency: c}, _opts) do
      "#Money<\#{a} \#{c}>"
    end
  end
end

jpy = %Money{amount: 1500, currency: :jpy}
usd = %Money{amount: 9.99, currency: :usd}

IO.puts("金額: \#{jpy}")    # String.Chars を使用
IO.puts("金額: \#{usd}")
IO.inspect(jpy)             # Inspect を使用
IO.inspect(usd)

# 文字列補間で自動的に to_string が呼ばれる
prices = [%Money{amount: 100}, %Money{amount: 200}, %Money{amount: 300}]
Enum.each(prices, fn p -> IO.puts("  - \#{p}") end)`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "Enumerable プロトコルの実装",
    description: `
<h2>Enumerable プロトコルの実装</h2>
<p><code>Enumerable</code> を実装すると、カスタム型で <code>Enum</code> / <code>Stream</code> のあらゆる関数が使えるようになります。</p>
`,
    defaultCode: `defmodule NumberRange do
  defstruct from: 0, to: 0, step: 1

  defimpl Enumerable do
    def count(%NumberRange{from: f, to: t, step: s}) do
      {:ok, max(0, div(t - f, s) + 1)}
    end

    def member?(%NumberRange{from: f, to: t, step: s}, val) do
      {:ok, val >= f and val <= t and rem(val - f, s) == 0}
    end

    def slice(_), do: {:error, __MODULE__}

    def reduce(_, {:halt, acc}, _fun), do: {:halted, acc}
    def reduce(range, {:suspend, acc}, fun), do: {:suspended, acc, &reduce(range, &1, fun)}
    def reduce(%NumberRange{from: f, to: t, step: s}, {:cont, acc}, fun) when f <= t do
      reduce(%NumberRange{from: f + s, to: t, step: s}, fun.(f, acc), fun)
    end
    def reduce(_range, {:cont, acc}, _fun), do: {:done, acc}
  end
end

r = %NumberRange{from: 0, to: 20, step: 3}

IO.inspect(Enum.to_list(r))       # [0, 3, 6, 9, 12, 15, 18]
IO.inspect(Enum.count(r))         # 7
IO.inspect(Enum.member?(r, 9))    # true
IO.inspect(Enum.member?(r, 10))   # false
IO.inspect(Enum.sum(r))
IO.inspect(Enum.filter(r, &(&1 > 10)))`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "ビヘイビアの応用 — プラグインアーキテクチャ",
    description: `
<h2>ビヘイビアの応用 — プラグインアーキテクチャ</h2>
<p>ビヘイビアを使うと、実装を差し替え可能なプラグインアーキテクチャを構築できます。設定によって実装を切り替えるパターンです。</p>
`,
    defaultCode: `# 通知送信のビヘイビア
defmodule Notifier do
  @callback send(recipient :: String.t(), message :: String.t()) :: {:ok, String.t()} | {:error, String.t()}
  @callback name() :: String.t()
end

defmodule EmailNotifier do
  @behaviour Notifier

  @impl Notifier
  def name, do: "Email"

  @impl Notifier
  def send(recipient, message) do
    # 実際には SMTP 送信するが、ここでは模擬
    IO.puts("[Email] To: \#{recipient} | \#{message}")
    {:ok, "email sent"}
  end
end

defmodule SlackNotifier do
  @behaviour Notifier

  @impl Notifier
  def name, do: "Slack"

  @impl Notifier
  def send(recipient, message) do
    IO.puts("[Slack] @\#{recipient}: \#{message}")
    {:ok, "slack message posted"}
  end
end

defmodule NotificationService do
  def notify(notifiers, recipient, message) do
    Enum.map(notifiers, fn mod ->
      {mod.name(), mod.send(recipient, message)}
    end)
  end
end

results = NotificationService.notify(
  [EmailNotifier, SlackNotifier],
  "alice",
  "デプロイが完了しました"
)
IO.inspect(results)`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "Access ビヘイビアとカスタムデータ構造",
    description: `
<h2>Access ビヘイビアとカスタムデータ構造</h2>
<p><code>Access</code> ビヘイビアを実装すると、<code>data[:key]</code> のブラケット構文と <code>get_in/put_in/update_in</code> のパス指定が使えるようになります。</p>
`,
    defaultCode: `defmodule CaseInsensitiveMap do
  defstruct data: %{}

  def new(kv_list \\\\ []) do
    data = Enum.into(kv_list, %{}, fn {k, v} ->
      {String.downcase(to_string(k)), v}
    end)
    %CaseInsensitiveMap{data: data}
  end

  def put(%CaseInsensitiveMap{data: d} = m, key, val) do
    %{m | data: Map.put(d, String.downcase(to_string(key)), val)}
  end

  defimpl Access do
    def fetch(%CaseInsensitiveMap{data: d}, key) do
      Map.fetch(d, String.downcase(to_string(key)))
    end

    def get_and_update(%CaseInsensitiveMap{data: d} = m, key, fun) do
      k = String.downcase(to_string(key))
      {get, new_data} = Map.get_and_update(d, k, fun)
      {get, %{m | data: new_data}}
    end

    def pop(%CaseInsensitiveMap{data: d} = m, key) do
      k = String.downcase(to_string(key))
      {Map.get(d, k), %{m | data: Map.delete(d, k)}}
    end
  end
end

map = CaseInsensitiveMap.new(Content_Type: "application/json", Accept: "text/html")

IO.inspect(map["content_type"])     # "application/json"
IO.inspect(map["ACCEPT"])           # "text/html"
IO.inspect(map["missing"])          # nil`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "プロトコルの統合 — Inspect カスタマイズ",
    description: `
<h2>プロトコルの統合 — Inspect カスタマイズ</h2>
<p>複雑なデータ構造を開発者にわかりやすく表示するため、<code>Inspect</code> プロトコルをカスタマイズします。セキュリティ上も重要（パスワードなどをマスク）。</p>
`,
    defaultCode: `defmodule User do
  defstruct [:id, :name, :email, :password_hash, :api_key]

  defimpl Inspect do
    import Inspect.Algebra

    def inspect(%User{} = u, opts) do
      # センシティブフィールドをマスク
      masked = %{u |
        password_hash: "**REDACTED**",
        api_key: mask_key(u.api_key)
      }
      concat([
        "#User<",
        "id=\#{u.id}",
        " name=", inspect(u.name, opts),
        " email=", inspect(u.email, opts),
        " api_key=", inspect(masked.api_key, opts),
        ">"
      ])
    end

    defp mask_key(nil), do: nil
    defp mask_key(key) when byte_size(key) <= 4, do: "****"
    defp mask_key(key) do
      prefix = String.slice(key, 0, 4)
      "\#{prefix}..." <> String.duplicate("*", 6)
    end
  end
end

user = %User{
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password_hash: "$bcrypt$...",
  api_key: "sk_live_abcdefghijklmn"
}

IO.inspect(user)

# リスト内でも機能する
users = [user, %User{id: 2, name: "Bob", email: "bob@example.com"}]
IO.inspect(users)`,
  },
  {
    chapter: "Ch.10: プロトコルとビヘイビア",
    title: "演習：プロトコルとビヘイビア",
    description: `
<h2>演習：プロトコルとビヘイビア</h2>
<p>プロトコルとビヘイビアの理解を深める演習です。</p>
<ol>
  <li>独自の <code>Describable</code> プロトコルを定義し、複数の型に実装する</li>
  <li>Logger ビヘイビアを定義し、コンソールとバッファの2実装を作る</li>
</ol>
`,
    defaultCode: `# 演習 1: Describable プロトコル
defprotocol Describable do
  @doc "人間が読めるテキスト説明を返す"
  def describe(value)
end

defimpl Describable, for: Integer do
  def describe(n) when n >= 0, do: "\#{n}（非負の整数）"
  def describe(n),             do: "\#{n}（負の整数）"
end

defimpl Describable, for: List do
  def describe([]),  do: "空のリスト"
  def describe(lst), do: "\#{length(lst)}要素のリスト: \#{inspect(Enum.take(lst, 3))}..."
end

defimpl Describable, for: Map do
  def describe(m) when map_size(m) == 0, do: "空のマップ"
  def describe(m), do: "\#{map_size(m)}キーのマップ: \#{inspect(Map.keys(m))}"
end

IO.puts(Describable.describe(42))
IO.puts(Describable.describe(-5))
IO.puts(Describable.describe([1, 2, 3, 4, 5]))
IO.puts(Describable.describe(%{a: 1, b: 2, c: 3}))

# 演習 2: Logger ビヘイビア
defmodule AppLogger do
  @callback log(level :: atom(), message :: String.t()) :: :ok
end

defmodule ConsoleLogger do
  @behaviour AppLogger
  @impl AppLogger
  def log(level, msg), do: IO.puts("[#{level |> Atom.to_string() |> String.upcase()}] \#{msg}")
end

ConsoleLogger.log(:info, "アプリ起動")
ConsoleLogger.log(:error, "接続失敗")`,
  },
  {
    chapter: "Ch.11: 型仕様とメタプログラミング",
    title: "型仕様とドキュメント",
    description: `
<h2>型仕様とドキュメント</h2>
<h3>@spec</h3>
<p>関数の型シグネチャを記述します。<code>Dialyzer</code> で静的解析が可能です。</p>
<pre><code>@spec function_name(arg_types) :: return_type</code></pre>
<h3>@type / @typep / @opaque</h3>
<p>カスタム型を定義します。<code>@typep</code> はプライベート型、<code>@opaque</code> は実装を隠蔽します。</p>
<h3>@doc と @moduledoc</h3>
<p>Markdown 形式のドキュメントを書けます。<code>mix docs</code> で HTML 生成、<code>iex</code> の <code>h</code> コマンドで表示できます。</p>
<h3>組み込み型</h3>
<p><code>integer()</code> <code>float()</code> <code>atom()</code> <code>binary()</code> <code>boolean()</code> <code>list(t)</code> <code>map()</code> <code>tuple()</code> <code>pid()</code> <code>any()</code> <code>none()</code></p>
`,
    defaultCode: `defmodule TypedMath do
  @moduledoc """
  型仕様を持つ数学モジュール。
  @spec で Dialyzer による静的型チェックが可能。
  """

  # カスタム型定義
  @type number_result :: {:ok, number()} | {:error, String.t()}
  @type matrix :: [[number()]]

  @doc """
  2つの数を足します。

  ## 例

      iex> TypedMath.add(1, 2)
      3
  """
  @spec add(number(), number()) :: number()
  def add(a, b), do: a + b

  @doc """
  0除算を安全に処理する割り算。

  ## 例

      iex> TypedMath.safe_divide(10, 2)
      {:ok, 5.0}

      iex> TypedMath.safe_divide(10, 0)
      {:error, "ゼロ除算"}
  """
  @spec safe_divide(number(), number()) :: number_result()
  def safe_divide(_a, 0), do: {:error, "ゼロ除算"}
  def safe_divide(a, b), do: {:ok, a / b}

  @doc """
  リストの平均値を計算します。

  ## 例

      iex> TypedMath.mean([1, 2, 3, 4, 5])
      {:ok, 3.0}
  """
  @spec mean(list(number())) :: number_result()
  def mean([]),   do: {:error, "空リストの平均は計算できません"}
  def mean(list), do: {:ok, Enum.sum(list) / length(list)}

  @doc """
  数値をクランプします（min〜maxの範囲に収める）。
  """
  @spec clamp(number(), number(), number()) :: number()
  def clamp(value, min, max) do
    value |> max(min) |> min(max)
  end
end

# 使用例
IO.puts(TypedMath.add(3, 4))
IO.inspect(TypedMath.safe_divide(10, 3))
IO.inspect(TypedMath.safe_divide(10, 0))
IO.inspect(TypedMath.mean([1, 2, 3, 4, 5]))
IO.inspect(TypedMath.mean([]))
IO.puts(TypedMath.clamp(15, 0, 10))
IO.puts(TypedMath.clamp(-5, 0, 10))
IO.puts(TypedMath.clamp(5, 0, 10))

# 型のチェック（is_* 関数）
IO.puts(is_integer(42))
IO.puts(is_float(3.14))
IO.puts(is_binary("hello"))
IO.puts(is_atom(:ok))
IO.puts(is_list([1, 2]))
IO.puts(is_map(%{a: 1}))
IO.puts(is_function(&IO.puts/1))`,
  },
  {
    chapter: "Ch.11: 型仕様とメタプログラミング",
    title: "マクロ",
    description: `
<h2>マクロ（メタプログラミング）</h2>
<p>Elixir のマクロはコンパイル時にコードを変換します。<code>if</code>、<code>defmodule</code>、<code>use</code> などの多くが実はマクロです。</p>
<h3>AST（抽象構文木）</h3>
<p><code>quote/1</code> でコードを AST（3要素タプル）に変換し、<code>unquote/1</code> でコンパイル時に値を埋め込みます。</p>
<pre><code>quote do: 1 + 2
# => {:+, [context: Elixir, ...], [1, 2]}</code></pre>
<h3>defmacro</h3>
<p>コンパイル時に展開されるマクロを定義します。マクロは引数を評価せずに AST として受け取ります。</p>
<p><strong>注意</strong>: 通常の関数で解決できる場合は関数を優先してください。</p>
`,
    defaultCode: `# AST の確認
ast = quote do
  1 + 2 * 3
end
IO.inspect(ast)

# quote と unquote
x = 42
ast_with_value = quote do
  unquote(x) + 10
end
IO.inspect(ast_with_value)

# シンプルなマクロの定義
defmodule MyMacros do
  # unless を実装するマクロ
  defmacro my_unless(condition, do: body) do
    quote do
      if !unquote(condition) do
        unquote(body)
      end
    end
  end

  # N回繰り返すマクロ
  defmacro times(n, do: body) do
    quote do
      Enum.each(1..unquote(n), fn _ ->
        unquote(body)
      end)
    end
  end

  # 式をログ付きで実行するマクロ
  defmacro log_call(expr) do
    expr_str = Macro.to_string(expr)
    quote do
      result = unquote(expr)
      IO.puts("[LOG] \#{unquote(expr_str)} => \#{inspect(result)}")
      result
    end
  end

  # assert マクロ（テストフレームワークのような）
  defmacro assert(expr) do
    expr_str = Macro.to_string(expr)
    quote do
      if unquote(expr) do
        IO.puts("✓ \#{unquote(expr_str)}")
      else
        IO.puts("✗ \#{unquote(expr_str)}")
      end
    end
  end
end

require MyMacros

# マクロの使用
MyMacros.my_unless(false, do: IO.puts("これは表示されます"))
MyMacros.my_unless(true,  do: IO.puts("これは表示されません"))

MyMacros.times(3, do: IO.puts("Hello!"))

MyMacros.log_call(1 + 2 * 3)
MyMacros.log_call(String.upcase("hello"))

MyMacros.assert(1 + 1 == 2)
MyMacros.assert(1 + 1 == 3)

# Macro モジュールのユーティリティ
ast = quote do: Enum.map([1, 2, 3], &(&1 * 2))
IO.puts(Macro.to_string(ast))`,
  },
  {
    chapter: "Ch.11: 型仕様とメタプログラミング",
    title: "use と __using__",
    description: `
<h2>use と __using__</h2>
<p><code>use Module</code> は <code>Module.__using__/1</code> マクロを呼び出し、定型コードをモジュールに注入します。</p>
<p>Elixir 標準の <code>use GenServer</code>、<code>use Supervisor</code> などはこの仕組みを使っています。</p>
<h3>仕組み</h3>
<pre><code>use MyModule
# ↓ 展開される
require MyModule
MyModule.__using__([])</code></pre>
`,
    defaultCode: `# __using__ マクロの定義
defmodule Validatable do
  @moduledoc "バリデーション機能を注入するモジュール"

  defmacro __using__(_opts) do
    quote do
      # バリデーションルールのリスト（モジュール属性）
      Module.register_attribute(__MODULE__, :validations, accumulate: true)

      # validates マクロを定義
      defmacro validates(field, opts) do
        quote do
          @validations {unquote(field), unquote(opts)}
        end
      end

      # validate/1 関数を生成
      def validate(data) do
        Enum.reduce(@validations, [], fn {field, opts}, errors ->
          value = Map.get(data, field)
          cond do
            Keyword.get(opts, :required) && is_nil(value) ->
              ["\#{field} は必須です" | errors]
            value != nil && Keyword.get(opts, :min_length) &&
              String.length(value) < opts[:min_length] ->
              ["\#{field} は\#{opts[:min_length]}文字以上" | errors]
            true -> errors
          end
        end)
      end
    end
  end
end

defmodule UserForm do
  use Validatable

  validates :name,  required: true, min_length: 2
  validates :email, required: true
end

IO.inspect(UserForm.validate(%{name: "Alice", email: "alice@example.com"}))
IO.inspect(UserForm.validate(%{name: "A", email: "a@b.com"}))
IO.inspect(UserForm.validate(%{name: nil, email: nil}))`,
  },
  {
    chapter: "Ch.11: 型仕様とメタプログラミング",
    title: "演習：型仕様とメタプログラミング",
    description: `
<h2>演習：型仕様とメタプログラミング</h2>
<p>型仕様とメタプログラミングの総合演習です。</p>
<ol>
  <li><code>@spec</code> を使ったモジュール — Dialyzer 対応の型アノテーション付き実装</li>
  <li>シンプルなマクロ — <code>unless/2</code> と <code>while/2</code> を実装</li>
</ol>
`,
    defaultCode: `# 演習 1: @spec 付きモジュール
defmodule MathUtils do
  @spec factorial(non_neg_integer()) :: pos_integer()
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)

  @spec clamp(number(), number(), number()) :: number()
  def clamp(value, min, max) do
    value |> max(min) |> min(max)
  end

  @spec safe_sqrt(number()) :: {:ok, float()} | {:error, String.t()}
  def safe_sqrt(n) when n >= 0, do: {:ok, :math.sqrt(n)}
  def safe_sqrt(_),             do: {:error, "負の数の平方根は定義されません"}
end

IO.inspect(MathUtils.factorial(10))
IO.inspect(MathUtils.clamp(150, 0, 100))
IO.inspect(MathUtils.clamp(-5,  0, 100))
IO.inspect(MathUtils.safe_sqrt(16.0))
IO.inspect(MathUtils.safe_sqrt(-1.0))

# 演習 2: マクロ
defmodule MyMacros do
  defmacro unless(condition, do: block) do
    quote do
      if !unquote(condition), do: unquote(block)
    end
  end

  defmacro times(n, do: block) do
    quote do
      Enum.each(1..unquote(n), fn _ -> unquote(block) end)
    end
  end
end

import MyMacros

unless 1 == 2, do: IO.puts("1 != 2 は真です")

times 3 do
  IO.puts("こんにちは！")
end`,
  },
  {
    chapter: "Ch.11: 型仕様とメタプログラミング",
    title: "おめでとうございます！ツアー完了",
    description: `
<h2>🎉 Tour of Elixir 完了！</h2>
<p>全11章を修了しました！学んだことを振り返りましょう：</p>
<table>
  <tr><th>章</th><th>内容</th></tr>
  <tr><td>Ch.1</td><td>Welcome — IEx, Elixir の特徴</td></tr>
  <tr><td>Ch.2</td><td>基本型と値 — 整数, アトム, リスト, マップなど</td></tr>
  <tr><td>Ch.3</td><td>パターンマッチ — =, ^, ガード, case, with</td></tr>
  <tr><td>Ch.4</td><td>関数とモジュール — fn, &, |>, alias, use</td></tr>
  <tr><td>Ch.5</td><td>制御フロー — if, cond, try/rescue</td></tr>
  <tr><td>Ch.6</td><td>コレクションと Enum — map, filter, reduce, for</td></tr>
  <tr><td>Ch.7</td><td>文字列とバイナリ — String, シジル, ヒアドキュメント</td></tr>
  <tr><td>Ch.8</td><td>プロセスと並行性 — spawn, send/receive, Agent, Task</td></tr>
  <tr><td>Ch.9</td><td>OTP と GenServer — GenServer, Supervisor</td></tr>
  <tr><td>Ch.10</td><td>プロトコルとビヘイビア — defprotocol, @callback</td></tr>
  <tr><td>Ch.11</td><td>型仕様とメタプログラミング — @spec, マクロ, use</td></tr>
</table>
<h3>次のステップ</h3>
<ul>
  <li><a href="https://elixir-lang.org/getting-started/introduction.html" target="_blank">公式 Getting Started</a></li>
  <li><a href="https://hexdocs.pm/elixir/" target="_blank">HexDocs — 標準ライブラリリファレンス</a></li>
  <li><a href="https://elixirschool.com/ja/" target="_blank">Elixir School（日本語）</a></li>
  <li><a href="https://phoenixframework.org/" target="_blank">Phoenix Framework</a> — Web アプリ開発</li>
</ul>
`,
    defaultCode: `# 総合演習：ミニタスクマネージャー
defmodule TaskManager do
  use GenServer

  # Client
  def start_link, do: GenServer.start_link(__MODULE__, [], name: __MODULE__)
  def add(title),     do: GenServer.call(__MODULE__, {:add, title})
  def complete(id),   do: GenServer.call(__MODULE__, {:complete, id})
  def list,           do: GenServer.call(__MODULE__, :list)
  def stats,          do: GenServer.call(__MODULE__, :stats)

  # Server
  @impl true
  def init(_), do: {:ok, %{tasks: [], next_id: 1}}

  @impl true
  def handle_call({:add, title}, _, s) do
    task = %{id: s.next_id, title: title, done: false}
    {:reply, task, %{s | tasks: [task | s.tasks], next_id: s.next_id + 1}}
  end

  @impl true
  def handle_call({:complete, id}, _, s) do
    tasks = Enum.map(s.tasks, fn t -> if t.id == id, do: %{t | done: true}, else: t end)
    {:reply, :ok, %{s | tasks: tasks}}
  end

  @impl true
  def handle_call(:list, _, s), do: {:reply, Enum.reverse(s.tasks), s}

  @impl true
  def handle_call(:stats, _, s) do
    total = length(s.tasks)
    done  = Enum.count(s.tasks, & &1.done)
    {:reply, %{total: total, done: done, pending: total - done}, s}
  end
end

TaskManager.start_link()
TaskManager.add("Elixir のパターンマッチを学ぶ")
TaskManager.add("GenServer を実装する")
TaskManager.add("Phoenix アプリを作る")
TaskManager.complete(1)
TaskManager.complete(2)

Enum.each(TaskManager.list(), fn t ->
  status = if t.done, do: "✅", else: "⬜"
  IO.puts("\#{status} [\#{t.id}] \#{t.title}")
end)
IO.inspect(TaskManager.stats())`,
  },
];
