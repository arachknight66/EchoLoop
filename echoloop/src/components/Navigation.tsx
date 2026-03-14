import Link from 'next/link';

const Navigation = () => {
    return (
        <nav className="bg-gray-800 text-white h-full p-4">
            <ul className="space-y-4">
                <li>
                    <Link href="/journal" className="hover:text-gray-400">Journal</Link>
                </li>
                <li>
                    <Link href="/sleep" className="hover:text-gray-400">Sleep</Link>
                </li>
                <li>
                    <Link href="/drawing" className="hover:text-gray-400">Reflect</Link>
                </li>
                <li>
                    <Link href="/insights" className="hover:text-gray-400">Insights</Link>
                </li>
                <li>
                    <Link href="/sounds" className="hover:text-gray-400">Calm</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;