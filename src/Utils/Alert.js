import Swal from "sweetalert2";

export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};

export const AlertonDelete = (id, handleDeleteFn, confirmText, successText) => {
  Swal.fire({
    title: "Are you sure?",
    text: confirmText || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await handleDeleteFn(id);
        console.log("Handle delete response:", res);
        Swal.fire({
          title: "Deleted!",
          text: successText || "Your item has been successfully deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error caught in AlertonDelete:", error);
        Swal.fire({
          title: "Error!",
          text: error?.message || "An error occurred while deleting the item.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    }
  });
};


export const AlertError = (usertext) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: usertext || "Something went wrong!",
    timer: 1500,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};
