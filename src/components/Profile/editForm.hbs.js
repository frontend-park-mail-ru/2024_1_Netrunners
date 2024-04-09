export const editFormTemplate = `
    <form id="myForm">
        <h1>Смена аватара</h1>
        <div class="edit-section">
            <div class="edit-form">
                <div class="error-avatar" id="avatar-errors"></div>
                <input type="file" id="imageInput" placeholder="Выберите изображение" name="avatar">
            </div>
            <button type="button" id="sendImageBtn" class="edit-form-button">Сохранить</Сохранить></button>
        </div>
        <h1>Смена логина</h1>
        <div class="edit-section">
            <div class="edit-form">
                <div class="error-username" id="username-errors"></div>
                <input type="text" id="loginInput" placeholder="Введите логин" name="username">
            </div>
            <button type="button" id="sendLoginBtn" class="edit-form-button">Сохранить</button>
        </div>
        <h1>Смена пароля</h1>
        <div class="edit-section">
            <div class="edit-form">
                <div class="error-password" id="password-errors"></div>
                <input type="password" id="passwordInput" placeholder="Введите пароль" name="password">
                <input type="password" id="confirmPasswordInput" placeholder="Подтвердите пароль", name="passConf">
            </div>
            <button type="button" id="sendPasswordBtn" class="edit-form-button">Сохранить</button>
        </div>
    </form>
    <button type="button" id="exit-editing-button" class="profile-page-buttons">Назад</button>`;