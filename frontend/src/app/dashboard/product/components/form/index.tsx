"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface CategoryProps {
  id: string;
  name: string;
}
interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {

  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const router = useRouter();


  async function handleRegisterProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const categoryIndex = formData.get("category") as string;

    if (!name || !price || !description || !categoryIndex || !image) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = getCookieClient();

    await api.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      console.log(err);
      toast.warning("Ocorreu um erro ao cadastrar o produto!");
    });

    toast.success("Produto cadastrado com sucesso!");
    router.push("/dashboard");
  }



  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (
        image.type !== "image/png" &&
        image.type !== "image/jpeg" &&
        image.type !== "image/jpg"
      ) {
        toast.warning("Formato de imagem inválido!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo Produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>
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

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Preço do produto"
          required
          className={styles.input}
        />

        <textarea
          name="description"
          placeholder="Digite a descrição do produto"
          required
          className={styles.input}
        />

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
