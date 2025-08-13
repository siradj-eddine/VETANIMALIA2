import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import RegisterImage from "../photo/imgs/register2.jpg";

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        { name, email, password, phone }
      );
      localStorage.setItem("token", res.data.token);

      toast.success(t("signup.success"));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || t("signup.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            {t("signup.title")}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {t("signup.subtitle")}
          </p>
        </header>

        <section className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            <article className="w-full lg:w-1/2 p-8 sm:p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t("signup.welcome")}
                </h2>

                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">{t("signup.or")}</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("signup.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("signup.name_placeholder")}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("signup.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("signup.password")}
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("signup.phone")}
                    </label>
                    <input
                      type="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="eg : 0668669562"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {loading ? t("signup.loading") : t("signup.register")}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                  {t("signup.have_account")}{" "}
                  <Link
                    to="/login"
                    className="font-medium text-orange-400 hover:text-orange-500"
                  >
                    {t("signup.login")}
                  </Link>
                </p>
              </div>
            </article>

            <aside className="hidden lg:block lg:w-1/2 bg-orange-50">
              <img
                src={RegisterImage}
                alt={t("signup.image_alt")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
