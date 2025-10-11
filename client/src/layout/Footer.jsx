import { Link } from "react-router-dom"

const Footer = () => {
    return <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Бидний тухай</h3>
                    <p className="text-sm">
                        Веб систем ба технологи хичээлийн баасан гаргийн 5-р пар дээр суудаг оюутнуудын бүтээл.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Багийн танилцуулга</h3>
                    <ul>
                        <li className="mb-2"><Link to="/team1" className="hover:text-gray-300">1-р баг</Link></li>
                        <li className="mb-2"><Link to="/team2" className="hover:text-gray-300">2-р баг</Link></li>
                        <li className="mb-2"><Link to="/team3" className="hover:text-gray-300">3-р баг</Link></li>
                        <li className="mb-2"><Link to="/team4" className="hover:text-gray-300">4-р баг</Link></li>
                        <li className="mb-2"><Link to="/team5" className="hover:text-gray-300">5-р баг</Link></li>
                        <li className="mb-2"><Link to="/team6" className="hover:text-gray-300">6-р баг</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Сошиал хаяг</h3>
                    <div className="flex space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M22.46 6c-.77.35-1.6.6-2.46.7.88-.52 1.55-1.36 1.87-2.35-.83.5-1.75.85-2.73 1.05-.79-.84-1.92-1.35-3.17-1.35-2.4 0-4.36 1.96-4.36 4.37 0 .34.04.68.11 1-3.63-.18-6.85-1.92-9-4.56-.38.65-.6 1.4-.6 2.22 0 1.54.78 2.9 1.96 3.7-.73-.02-1.42-.22-2.02-.56v.06c0 2.15 1.53 3.94 3.56 4.34-.37.1-.75.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.72 2.16 2.98 4.07 3.01-1.49 1.17-3.36 1.87-5.41 1.87-.35 0-.69-.02-1.03-.06 1.92 1.23 4.19 1.94 6.63 1.94 7.95 0 12.3-6.59 12.3-12.3 0-.18 0-.35-.01-.53.84-.6 1.55-1.35 2.12-2.21z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M22 3H2c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h10.59V14.41H8.5v-3.5h4.09v-2.91c0-4.07 2.51-6.29 6.18-6.29 1.76 0 3.27.13 3.71.19v4.3h-2.54c-2 0-2.39.95-2.39 2.35v2.47h4.79l-.63 3.5h-4.16V21H22c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M12 2.2c-5.39 0-9.8 4.41-9.8 9.8 0 4.33 2.75 8 6.55 9.32.48.09.65-.21.65-.47v-1.74c-2.66.58-3.22-1.29-3.22-1.29-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58 1.02.07 1.56 1.04 1.56 1.04.85 1.49 2.24 1.06 2.78.81.09-.62.33-1.06.6-1.31-2.13-.24-4.38-1.06-4.38-4.71 0-1.04.37-1.89.99-2.56-.1-.25-.43-1.24.09-2.57 0 0 .81-.26 2.66 1.01a9.282 9.282 0 0 1 4.85 0c1.85-1.28 2.66-1.01 2.66-1.01.52 1.33.19 2.32.09 2.57.62.67.99 1.52.99 2.56 0 3.66-2.25 4.47-4.39 4.71.34.29.64.87.64 1.75v2.58c0 .26.17.56.65.47 3.79-1.33 6.55-5 6.55-9.32 0-5.39-4.41-9.8-9.8-9.8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                <p>&copy; 2025 ШУТИС-МХТС.</p>
            </div>
        </div>
    </footer>

}

export default Footer
