package actions

import (
  "github.com/gobuffalo/buffalo"
  "github.com/gobuffalo/pop"
  "github.com/pkg/errors"
  "backend/models"
)

type LocationsResource struct {
  buffalo.Resource
}

// GET /locations
func (v LocationsResource) List(c buffalo.Context) error {
  // Get the DB connection from the context
  tx := c.Value("tx").(*pop.Connection)

  locations := &models.Locations{}

  // Paginate results. Params "page" and "per_page" control pagination.
  // Default values are "page=1" and "per_page=20".
  q := tx.PaginateFromParams(c.Params())

  // Retrieve all Locations from the DB
  if err := q.All(locations); err != nil {
    return errors.WithStack(err)
  }

  // Add the paginator to the headers so clients know how to paginate.
  c.Response().Header().Set("X-Pagination", q.Paginator.String())

  return c.Render(200, r.JSON(locations))
}

// path POST /locations
func (v LocationsResource) Create(c buffalo.Context) error {
  // Allocate an empty Location
  location := &models.Location{}

  // Bind location to the html form elements
  if err := c.Bind(location); err != nil {
    return errors.WithStack(err)
  }

  // Get the DB connection from the context
  tx := c.Value("tx").(*pop.Connection)

  // Validate the data from the html form
  verrs, err := tx.ValidateAndCreate(location)
  if err != nil {
    return errors.WithStack(err)
  }

  if verrs.HasAny() {
    // Render errors as JSON
    return c.Render(400, r.JSON(verrs))
  }

  return c.Render(201, r.JSON(location))
}
