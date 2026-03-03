document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {

    if (!window.supabase) {
        console.error("Supabase not loaded");
        return;
    }

    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error("Database Error:", error);
        return;
    }

    const container = document.getElementById('product-list');

    if (!data || data.length === 0) {
        container.innerHTML = "<p class='text-center'>No products found.</p>";
        return;
    }

    data.forEach(product => {
        container.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card shadow">
                <img src="${product.image}" class="card-img-top">
                <div class="card-body">
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <h6 class="text-primary">₱${product.price}</h6>
                </div>
            </div>
        </div>
        `;
    });
}