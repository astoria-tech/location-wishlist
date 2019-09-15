package models

import (
  "encoding/json"
  "time"
  "github.com/gofrs/uuid"
)

type Location struct {
  ID        uuid.UUID `json:"id" db:"id"`
  CreatedAt time.Time `json:"created_at" db:"created_at"`
  UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
  Address   string    `json:"address" db:"address"`
}

// String is not required by pop and may be deleted
func (b Location) String() string {
  jb, _ := json.Marshal(b)
  return string(jb)
}

// Locations is not required by pop and may be deleted
type Locations []Location

// String is not required by pop and may be deleted
func (b Locations) String() string {
  jb, _ := json.Marshal(b)
  return string(jb)
}
