import Image from "next/image";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import LoginForm from "./components/login";

export default function Home() {
  return (
    <>
    <LoginForm/>
    </>
  );
}
