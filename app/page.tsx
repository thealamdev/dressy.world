import { MessageSquareDot } from "lucide-react";
import Link from "next/link";
import OrderForm from "./components/OrderForm";
import Banner from "./components/Banner";

const shortsLinks = [
  "cimrHW31uMo",
  "al4hTmrfmmM",
  "sP9vK6v8V-M"
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-linear-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-6xl space-y-4">
        {/* <h3 className="bangla-text text-center text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
          আমাদের সাথে যোগাযোগ করতে চাইলে নিচের বাটন এ ক্লিক করুন
        </h3>
        <div className="flex justify-center">
          <Link
            href={`https://wa.me/8801926859047`}
            className="flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <MessageSquareDot className="text-white w-6 h-6" />
            <span className="text-xl font-bold text-white">Chat on WhatsApp</span>
          </Link>
        </div> */}

        {/* Bengali Text */}
        {/* <div className="text-center">
          <h3 className="bangla-text text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
            বিস্তারিত জানতে আমাদের সাথে সরাসরি কথা বলতে যোগাযোগ করুন
          </h3>
          <a
            href="tel:+8801926859047"
            style={{ letterSpacing: 4 }}
            className="text-3xl md:text-3xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            01926-859047
          </a>
        </div> */}

        <Banner />
        <OrderForm />

        {/* Video Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 justify-center">
          {shortsLinks.length > 0 && (
            shortsLinks.map((short: any, index: number) => (
              <div
                key={index}
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                style={{ aspectRatio: '9/16' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${short}`}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Product Video"
                ></iframe>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}