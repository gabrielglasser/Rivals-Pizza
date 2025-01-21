"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image  from "next/image";

export function Form() {

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>();

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0];

          if (image.type !== "image/png" && image.type !== "image/jpeg" && image.type !== ("image/jpg")) {
            return;
          }

          setImage(image);
          setPreviewImage(URL.createObjectURL(image));
        }
      }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={32} color="#fff" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Imagem do produto"
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>
      </form>
    </main>
  );
}
