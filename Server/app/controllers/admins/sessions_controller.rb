class Admins::SessionsController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]

  layout false

  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    respond_with(resource, serialize_options(resource))
  end

  # POST /resource/sign_in
  def create 
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource)
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # The path used after sign up.
  def after_sign_in_path_for(resource)
    # super(resource)
    root_url(subdomain: current_user.tenant_id)
  end

  def after_sign_out_path_for(resource)
    new_session_url(resource, subdomain: 'www')
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
