// components/Header.tsx
"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import LoginButton from "../buttons/login-button";
import RegisterButton from "../buttons/register-button";
import Image from "next/image";
import HeaderWrapper from "../ui/header-wrapper";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <HeaderWrapper>
      <nav className="mx-auto px-4 sm:px-6 md:px-8 lg:px-24 py-2 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={"/logo/clear_cutoff_logo.png"}
            alt="Logo"
            width={160}
            height={42}
          />
          <div className="text-brand heading-large">Academy</div>
        </div>
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link
              href="#features"
              className="text-gray-600 hover:text-indigo-700 transition"
            >
              {t("features")}
            </Link>
          </li>
          <li>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-indigo-700 transition"
            >
              {t("pricing")}
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-600 hover:text-indigo-700 transition"
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher /> {/* Integrated here */}
          <div className="flex gap-1">
            <LoginButton />
            <RegisterButton isFull={true} />
          </div>
        </div>
      </nav>
    </HeaderWrapper>
  );
}
