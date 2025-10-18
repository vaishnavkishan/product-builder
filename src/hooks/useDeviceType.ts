import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Returns the current device type using MUI breakpoints.
 * - mobile: down('sm')
 * - tablet: between('sm','md')
 * - desktop: up('md')
 */
export default function useDeviceType() {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let device: DeviceType = "desktop";
  if (isMobile) device = "mobile";
  else if (isTablet) device = "tablet";

  return {
    device,
    isMobile,
    isTablet,
    isDesktop,
  } as const;
}
