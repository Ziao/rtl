import { FC } from "react";
import { BundelItem } from "../../types/api/bundleResponse";

interface ArticlesPageUiProps {
  isLoading: boolean;
  bundleItems?: BundelItem[];
}

export const BundlePageUi: FC<ArticlesPageUiProps> = ({ isLoading, bundleItems }) => {
  return (
    <div>
      <h2>Articles</h2>
      {isLoading && <span>Loading..</span>}
      <ul>
        {bundleItems?.map((item) => (
          <li key={item.id}>{item.titel}</li>
        ))}
      </ul>
    </div>
  );
};
