import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontSize:"2rem", padding:"10rem", margin:"2rem"}}>
      <Link href="/pages/contador">Contador</Link><br></br>
      <Link href="../pages/api">Api</Link>
    </div>
  );
}
