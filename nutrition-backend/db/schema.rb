# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_29_032447) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.datetime "meet_schedule"
    t.string "meet_link"
    t.string "status", default: "pending"
    t.bigint "dietitian_id", null: false
    t.bigint "patient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dietitian_id"], name: "index_appointments_on_dietitian_id"
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
  end

  create_table "dietitians", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "given_name"
    t.string "family_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "dietitian"
  end

  create_table "patients", force: :cascade do |t|
    t.string "email"
    t.string "family_name"
    t.string "given_name"
    t.integer "age"
    t.float "height"
    t.string "gender"
    t.string "password_digest"
    t.float "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "patient"
  end

  create_table "records", force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "appointment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "assessments", default: [], array: true
    t.text "recommendations", default: [], array: true
    t.index ["appointment_id"], name: "index_records_on_appointment_id"
    t.index ["patient_id"], name: "index_records_on_patient_id"
  end

  add_foreign_key "appointments", "dietitians"
  add_foreign_key "appointments", "patients"
  add_foreign_key "records", "appointments"
  add_foreign_key "records", "patients"
end
