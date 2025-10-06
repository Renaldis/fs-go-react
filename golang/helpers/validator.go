package helpers

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

func TranslateErrorMessage(err error) map[string]string {
	// Membuat map untuk menampung pesan error
	errorsMap := make(map[string]string)

	// Handle validasi dari validator.v10
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			field := fieldError.Field()

			switch fieldError.Tag() {
			case "required":
				errorsMap[field] = fmt.Sprintf("%s is required", field)
			case "email":
				errorsMap[field] = "Invalid email format"
			case "unique":
				errorsMap[field] = fmt.Sprintf("%s already exists", field)
			case "min":
				errorsMap[field] = fmt.Sprintf("%s must be at least %s characters", field, fieldError.Param())
			case "max":
				errorsMap[field] = fmt.Sprintf("%s must be at most %s characters", field, fieldError.Param())
			case "numeric":
				errorsMap[field] = fmt.Sprintf("%s must be a number", field)
			default:
				errorsMap[field] = "Invalid value"
			}
		}
	}

	// Handle error dari GORM untuk duplicate entry
	if err != nil {
		// Cek jika error mengandung "Duplicate entry" (duplikasi data di database)
		if strings.Contains(err.Error(), "Duplicate entry") {
			if strings.Contains(err.Error(), "username") {
				errorsMap["Username"] = "Username already exists" // Pesan error jika username sudah ada
			}
			if strings.Contains(err.Error(), "email") {
				errorsMap["Email"] = "Email already exists" // Pesan error jika email sudah ada
			}
		} else if err == gorm.ErrRecordNotFound {
			// Jika data yang dicari tidak ditemukan di database
			errorsMap["Error"] = "Record not found"
		}
	}

	// Mengembalikan map yang berisi pesan error
	return errorsMap
}
func IsDuplicateEntryError(err error) bool {

	return err != nil && strings.Contains(err.Error(), "Duplicate entry")

}
