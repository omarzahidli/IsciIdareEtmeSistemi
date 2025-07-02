import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0 text-center">
          &copy; {new Date().getFullYear()} İşçi İdarəetmə Sistemi. Bütün hüquqlar qorunur.
        </p>
        <div className="flex gap-4">
            <a href="https://github.com/omarzahidli" target="_blank" className="text-center flex-wrap justify-center inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub Profilimə Keçid Et
            </a>
        </div>
      </div>
    </footer>
  )
}
