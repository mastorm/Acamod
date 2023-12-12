import { ModuleDetailsPageProps } from "@/app/(authenticated)/modules/[moduleId]/routeParams";
import { Editor } from "@/app/(authenticated)/modules/[moduleId]/notes/editor";

export default async function ModuleNotes({
  params: { moduleId },
}: ModuleDetailsPageProps) {
  return (
    <main>
      <Editor />
    </main>
  );
}
