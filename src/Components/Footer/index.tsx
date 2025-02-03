export default function Footer() {
    return (
        <footer className="shadow-sm bg-gray-800">
            <div className="w-full mx-auto max-w-screen p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-100 sm:text-center dark:text-gray-400">© 2025 <a href="https://github.com/GuilhermeRS23" className="hover:underline">Guilherme R.Silva</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
};
