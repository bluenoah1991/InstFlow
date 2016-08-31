class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_tenant

  validates :tenant_id, uniqueness: true
  has_secure_token :token

  private

  def create_tenant
    Apartment::Tenant.create(tenant_id)
  end
end
