import PersistentDrawerLeft from "@/components/persistentDrawerLeft/persistentDrawerLeft";
import { getListBlobsAndLog, filterFilesNames } from "@/utils/utility";

export default async function PersistentDrawerLeftWrapper() {
  const files = await getListBlobsAndLog();
  const fileNames = filterFilesNames(files);
  return (
    <div>
      <PersistentDrawerLeft items={fileNames} />
    </div>
  );
}
