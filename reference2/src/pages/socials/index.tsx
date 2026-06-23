import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

const socials = () => {
    return (
        <div>
            <div className="flex flex-col bg-black">
                <Navbar />
                <div className="flex flex-col items-center gap-2 pt-28 lg:pt-60 md:pt-60 sm:pt-60">
                    <span className="text-white font-sans">sairavig@cs.cmu.edu</span>
                    <Link href={"https://github.com/FloareDor"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">GitHub</span>
                    </Link>
                    <Link href={"https://www.linkedin.com/in/sai-ravi-teja-gangavarapu/"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Linkedin</span>
                    </Link>
                    <Link href={"https://x.com/DorFloare"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Twitter</span>
                    </Link>
                    <Link href={"https://devpost.com/FloareDor"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Devpost</span>
                    </Link>
                    <Link href={"https://soundcloud.com/raven-714331711"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">SoundCloud</span>
                    </Link>
                    <Link href={"https://www.instagram.com/floare_dor/"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Instagram</span>
                    </Link>
                    <Link href={"https://leetcode.com/Sai_Ravi_Teja/"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Leetcode? Seriously?</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default socials;