// import type { ButtonProps } from "../layout/htmlInterfaces";
//
// type ButtonShape = "RECTANGLE" | "PILL";
//
// export type ButtonColor = "RED" | "BLUE" | "YELLOW" | "MONO";
//
// interface AdditionalProps {
//   shape?: ButtonShape;
//   isOn?: boolean;
//   color?: ButtonColor;
// }
//
// export type NeutralButtonProps = ButtonProps & AdditionalProps;
//
// const shapeToClassName: Record<ButtonShape, string> = {
//   PILL: "rounded-full",
//   RECTANGLE: "rounded-md",
// };
//
// // specify font, bg
// const colorToClassName: Record<ButtonColor, string> = {
//   RED: `bg-red text-vivid-inverted`,
//   YELLOW: `bg-yellow text-vivid-inverted`,
//   BLUE: `bg-yellow text-vivid-inverted`,
//   MONO: `bg-vivid text-vivid-inverted`,
// };
//
// const makeButtonClassName = (
//   shape: ButtonShape,
//   color: ButtonColor = "MONO",
//   isOn?: boolean,
// ) => {
//   const shapeClassName = shapeToClassName[shape];
//   const offClassName = "border-1 border-dimdim hover:border-dim";
//   const onClassName = colorToClassName[color];
//   const onOffClassName = isOn ? onClassName : offClassName;
//   const extraClassName = "px-3 py-2";
//
//   return `${shapeClassName} ${onOffClassName} ${extraClassName}`;
// };

// /**

const CustomButton = () =>
    // {
    // shape = "RECTANGLE",
    // ...props
    // },
    {
        // const { isOn, color, children, className, ...defaultProps } = props;
        //
        // const defaultClassName = makeButtonClassName(shape, color, isOn);

        return (
            <div></div>
            // <button {...defaultProps} className={`${className} ${defaultClassName}`}>
            //   {children}
            // </button>
        );
    };

export default CustomButton;
