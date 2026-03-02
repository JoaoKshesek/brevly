import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../input";
import styles from "./styles.module.css";
import { Button } from "../button";
import { useCreateLink } from "@/features/links/hooks/useCreateLink";
import {
  createLinkSchema,
  type CreateLinkSchema,
} from "@/features/links/schemas/create-link-schema";
import type { CreateLinkDTO } from "@/features/links/types/link.types";

export function NewLink() {
  const { createLink, isLoading } = useCreateLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });

  async function onSubmit(data: CreateLinkDTO) {
    await createLink(data);
    reset();
  }

  return (
    <div className={styles.newLink}>
      <h1 className={styles.title}>Novo link</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputs}>
          <Input
            label="Link original"
            placeholder="https://exemplo.com"
            {...register("originalUrl")}
            error={errors.originalUrl?.message}
          />

          <Input
            label="Link encurtado"
            prefix="brev.ly/"
            {...register("slug")}
            error={errors.slug?.message}
          />
        </div>

        <Button
          label={isLoading ? "Salvando..." : "Salvar link"}
          variant="primary"
          disabled={isLoading}
          type="submit"
        />
      </form>
    </div>
  );
}
