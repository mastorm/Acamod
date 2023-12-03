import { PlusCircle } from "lucide-react";
import { ModuleFormDialog } from "../_shared/module-form-dialog";
import { db } from "@/lib/database";
import { modules } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/getSession";
import { Button } from "@/components/ui/button";
import React from "react";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import {
  ModuleSchema,
  moduleSchema,
} from "@/app/(authenticated)/_shared/moduleSchema";

export function CreateNewModuleAction() {
  async function createModule(data: ModuleSchema) {
    "use server";
    const payload = moduleSchema.parse(data);

    const session = await getSession();

    if (!session) {
      throw new Error("unauthorized!");
    }

    const result = await db
      .insert(modules)
      .values({
        name: payload.name,
        shortCode: payload.shortCode == "" ? null : payload.shortCode,
        credits: payload.credits == 0 ? null : payload.credits,
        userId: session.user.id,
      })
      .returning({ id: modules.id });

    revalidatePath("/dashboard");
    redirect(urls.moduleDetails(result[0].id));
  }

  return (
    <ModuleFormDialog
      onSave={createModule}
      defaultValues={{
        credits: 0,
        name: "",
        shortCode: "",
      }}
      texts={{
        description: "Bitte geben Sie die Details für das neue Moduls ein:",
        title: "Neues Modul erstellen",
        saveButton: "Erstellen",
        toast: {
          title: "Erfolgreich erstellt!",
          description: "Das Modul wurde erfolgreich angelegt",
        },
      }}
    >
      <Button variant={"ghost"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Neues Modul erstellen
      </Button>
    </ModuleFormDialog>
  );
}
