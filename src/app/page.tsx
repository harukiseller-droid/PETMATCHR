import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h2>Welcome to PetMatchr</h2>
            <p>Find the perfect dog breed for your lifestyle.</p>
            <nav>
                <ul>
                    <li>
                        <Link href="/breeds/golden-retriever">Golden Retriever Profile</Link>
                    </li>
                    <li>
                        <Link href="/cost/golden-retriever-cost-austin-texas">Cost Example</Link>
                    </li>
                    <li>
                        <Link href="/problems/golden-retriever-separation-anxiety">Problem Example</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
