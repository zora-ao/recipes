import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme();

  const bgColor = theme === "dark" ? "#000000" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Sonner
      theme={theme}
      className="toaster group bg-black text-white"
      style={
        {
          "--normal-bg": textColor,
          "--normal-text": bgColor,
          "--normal-border": "var(--border)",
        }
      }
      {...props} />
  );
}

export { Toaster }
