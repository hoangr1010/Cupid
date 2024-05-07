import AsyncSelect from "react-select/async";
import { toast } from "sonner";
import { Item } from "./Item";
import { getCompany } from "./../../api/company";
import tailwindConfig from "./../../tailwind";
import resolveConfig from "tailwindcss/resolveConfig";

export const CompanyDropDown = ({ company, setCompany }) => {
  // get tailwind Theme
  const config = resolveConfig(tailwindConfig);
  const { accentColor } = config.theme;

  // custom theme for the react select component
  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: accentColor.primaryLight,
      primary: accentColor.primary,
      primary75: accentColor.primaryDark,
      primary50: accentColor.primary,
    },
    borderRadius: 2,
  });

  const searchCompany = async (string) => {
    return new Promise(async (resolve) => {
      try {
        const companies = await getCompany(string);
        const formattedOptions = companies.map((item) => ({
          value: item.name,
          label: <Item imgUrl={item.logo} name={item.name} />,
        }));
        resolve(formattedOptions);
      } catch (err) {
        toast.error("Error getting company");
      }
    });
  };

  const handleChange = (selectedOption) => {
    setCompany(selectedOption);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={searchCompany}
        theme={theme}
        onChange={handleChange}
        value={company}
      />
    </>
  );
};
