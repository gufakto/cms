package repository

import (
	"context"
	"fmt"

	"github.com/gufakto/cms/domain"
	"gorm.io/gorm"
)

type menuRepository struct {
	db *gorm.DB
}

type MenuRepository interface {
	GetPages(ctx context.Context, limit, page int, filters map[string]interface{}) ([]domain.Menu, error)
	GetById(ctx context.Context, id int64) (*domain.Menu, error)
	Create(ctx context.Context, menu domain.Menu) (*domain.Menu, error)
	Update(ctx context.Context, menu domain.Menu) (*domain.Menu, error)
	Delete(ctx context.Context, id uint64) error
}

func NewMenuRepository() MenuRepository {
	return &menuRepository{}
}

func (r *menuRepository) GetPages(ctx context.Context, limit, page int, filters map[string]interface{}) ([]domain.Menu, error) {
	menus := []domain.Menu{}
	offset := (page - 1) * limit
	query := r.db.WithContext(ctx).Model(&domain.Menu{})
	for field, value := range filters {
		if field == "" || value == "" {
			continue
		}
		switch v := value.(type) {
		case string:
			query = query.Where(fmt.Sprintf("%s ILIKE ?", field), "%"+v+"%")
		default:
			query = query.Where(fmt.Sprintf("%s = ?", field), v)
		}
	}
	err := query.Limit(limit).Offset(offset).Find(&domain.Menu{}).Scan(menus).Error
	if err != nil {
		return nil, err
	}
	return menus, nil
}

func (r *menuRepository) GetById(ctx context.Context, id int64) (*domain.Menu, error) {
	menu := domain.Menu{}
	err := r.db.WithContext(ctx).Model(&domain.Menu{}).Where("id = ?", id).FirstOrInit(menu).Error
	return &menu, err
}

func (r *menuRepository) Create(ctx context.Context, menu domain.Menu) (*domain.Menu, error) {
	err := r.db.WithContext(ctx).Model(&domain.Menu{}).Create(menu).Error
	return &menu, err
}

func (r *menuRepository) Update(ctx context.Context, menu domain.Menu) (*domain.Menu, error) {
	err := r.db.WithContext(ctx).Model(&domain.Menu{}).Save(menu).Error
	return &menu, err
}

func (r *menuRepository) Delete(ctx context.Context, id uint64) error {
	err := r.db.WithContext(ctx).Model(&domain.Menu{}).Where("id=?", id).Delete(&domain.Menu{}).Error
	return err
}
