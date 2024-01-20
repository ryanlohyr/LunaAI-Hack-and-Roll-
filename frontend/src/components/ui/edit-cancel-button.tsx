import { Button } from "./button";

export const EditCancelButton = ({
    isEdit,
    toggleEdit,
    handleSubmit,
  }: {
    isEdit: boolean;
    toggleEdit: () => void;
    handleSubmit: () => void;
  }) => {
    return !isEdit ? (
      <Button
        variant="outline"
        size="sm"
        onClick={() => toggleEdit()}
        className="text-xs w-fit self-end"
      >
        Edit
      </Button>
    ) : (
      <div className="flex flex-row gap-x-4 items-center self-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleEdit()}
          className="text-xs w-fit"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit} className="text-xs w-fit" size="sm">
            Submit
        </Button>
      </div>
    );
  };