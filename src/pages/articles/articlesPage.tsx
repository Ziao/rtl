import { FC } from "react";
import { ArticlesPageUi } from "./articlesPageUi";

/**
 * I like to separate complex components into two parts
 * - One for logic and gathering data
 * - One for rendering the UI and handling events (postfixed with "..Ui")
 * This way, things stay easily testable and it helps in keeping components small and concise.
 * For smaller components, such as buttons, this is often overkill. It may even be overkill in this situation, but hey - you asked :)
 */
export const ArticlesPage: FC = () => {
  return <ArticlesPageUi />;
};
