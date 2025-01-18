import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoimg from "/public/logo.png";
import { LogOutIcon } from "lucide-react";

export function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/dashboard">
            <Image         
              alt="logo"
              src={logoimg}
              width={190}
              height={60}
              priority={true}
              quality={100}
            />
          </Link>

          <nav>
            <Link href="/dashboard/category">Categoria</Link>
            <Link href="/dashboard/product">Produto</Link>

            <form>
                <button type="submit">
                <LogOutIcon size={24} color="#fff" />
                </button>
            </form>

          </nav>

        </div>
      </header>
    </>
  );
}
