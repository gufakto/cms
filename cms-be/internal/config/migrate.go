package config

import (
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
	"github.com/gufakto/cms/domain"
	"gorm.io/gorm"
)

func RunMigration() {
	m := gormigrate.New(DB, gormigrate.DefaultOptions, []*gormigrate.Migration{
		{
			ID: "202508241",
			Migrate: func(tx *gorm.DB) error {
				return tx.Migrator().CreateTable(
					&domain.User{},
					&domain.Menu{},
					&domain.Role{},
					&domain.UserRole{},
					&domain.RoleMenu{},
				)
			},
			Rollback: func(tx *gorm.DB) error {
				return tx.Migrator().DropTable(
					&domain.UserRole{},
					&domain.RoleMenu{},
					&domain.User{},
					&domain.Role{},
					&domain.Menu{},
				)
			},
		},
	})

	if err := m.Migrate(); err != nil {
		log.Fatalf("❌ migrasi gagal: %v", err)
	}
	log.Println("✅ migrasi sukses")
}
